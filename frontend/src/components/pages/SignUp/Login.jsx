/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import axios from "../../../Axios/axios.js";
import "../../../assets/styles/signup.css";
import { Oval } from "react-loader-spinner";
function Login() {
  const navigate = useNavigate();
  const { dispatchUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("admin");
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      switch (userRole) {
        case "admin":
          const adminData = await axios.post("/admin/login", user);
          setMessage(adminData.data.message);
          if (adminData.data.admin.verified) {
            localStorage.setItem("userRole", "Admin");
            localStorage.setItem("token", adminData.data.token);
            dispatchUser({
              type: "SET_USER",
              payload: {
                user: {
                  email: adminData.data.admin.email,
                  verified: adminData.data.admin.verified,
                },
                role: "Admin",
              },
            });
            navigate("/admin/");
          } else {
            navigate("/notVerified", { state: { email } });
          }
          break;
        case "teacher":
          const teacherData = await axios.post("/admin/login", user);
          localStorage.setItem("userRole", "Admin");
          localStorage.setItem("token", teacherData.data.token);
          setMessage(teacherData.data.message);
          dispatchUser({
            type: "SET_USER",
            payload: {
              user: {
                email: teacherData.data.admin.email,
              },
              role: "Teacher",
            },
          });
          break;
        default:
          const studentData = await axios.post("/admin/login", user);
          localStorage.setItem("userRole", "Admin");
          localStorage.setItem("token", studentData.data.token);
          setMessage(studentData.data.message);
          dispatchUser({
            type: "SET_USER",
            payload: {
              user: {
                email: studentData.data.admin.email,
              },
              role: "Student",
            },
          });
          break;
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };
  return (
    <div>
      {error && (
        <div className="p-2">
          <p className="text-center text-red-900 bg-slate-200 p-2 rounded-md shadow-sm">
            {error}
          </p>
        </div>
      )}
      <form className="login space-y-6 mx-auto" onSubmit={handleSubmit}>
        <div className="md:w-4/5 mx-auto pt-5">
          <label htmlFor="role">Login As:</label>
          <select
            name="role"
            id="role"
            onChange={(e) => setUserRole(e.target.value)}
            className="w-full rounded-md border p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div className="md:w-4/5 mx-auto">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email Address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onBlur={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        <div className="md:w-4/5 mx-auto">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="text-sm">
              <Link
                to="/forgotPassword"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              onBlur={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border p-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="md:w-4/5 mx-auto">
          <button
            type="submit"
            className="flex gap-5 justify-center items-center w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
            disabled={loading}
          >
            <span>Sign In</span>
            {loading && (
              <Oval
                width={20}
                height={20}
                strokeWidth={10}
                strokeWidthSecondary={10}
                color="white"
                secondaryColor="blue"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
