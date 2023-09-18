/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ForgotPasswordSvg from "../../../assets/images/ResetPassword.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "../../../Axios/axios";
function SetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`/admin/setPassword/${token}`, { password });
      toast.success(`${res.data.message}. Redirecting to login page`, {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col lg:flex-row h-screen bg-slate-900">
        <div className="lg:flex-1 flex items-center justify-center">
          <img
            src={ForgotPasswordSvg}
            alt="Forgot Password"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </div>
        <div className="lg:flex-1 flex items-center justify-center px-5 text-white">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-5">
              Change Your Password
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="password" className="text-sm opacity-80">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onBlur={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border-1 border-slate-500 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="confirmPassword" className="text-sm opacity-80">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  onBlur={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-md border-1 border-slate-500 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-fit mx-auto">
                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white rounded-md shadow-md p-2 border border-slate-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SetPassword;
