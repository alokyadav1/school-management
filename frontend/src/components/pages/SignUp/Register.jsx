/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import axios from "../../../Axios/axios.js";
import "../../../assets/styles/signup.css";
function Register() {
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
          const adminData = await axios.post("/admin/register", user);
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
            navigate("/notVerified", {state:{email}});
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
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div>
      {error && <div className="p-2">
        <p className="text-center text-red-900 bg-slate-200 p-2 rounded-md shadow-sm">
          {error}
        </p>
      </div>}
      <form className="login space-y-6 mx-auto" onSubmit={handleSubmit}>
        <div className="md:w-4/5 mx-auto pt-5">
          <label htmlFor="role">Register as : </label>
          <select
            name="role"
            id="role"
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">student</option>
            <option value="teacher">teacher</option>
          </select>
        </div>
        <div className="md:w-4/5 mx-auto">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onBlur={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="off"
              onBlur={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="w-4/5 mx-auto">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:cursor-not-allowed disabled:opacity-80"
            disabled={loading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
