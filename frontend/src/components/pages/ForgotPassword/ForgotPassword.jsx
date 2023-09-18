/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ForgotPasswordSvg from "../../../assets/images/Forgotpassword.svg";
import axios from "../../../Axios/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const user = {
      email,
    };
    try {
      const res = await axios.post("/admin/forgotPassword", { email });
      toast.success(res.data.message, {
        position: "top-center",
      });
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
        <div className="lg:flex-1 flex items-center justify-end">
          <img
            src={ForgotPasswordSvg}
            alt="Forgot Password"
            className="w-full lg:w-2/3 drop-shadow-2xl"
          />
        </div>
        <div className="lg:flex-1 flex items-center justify-start px-2 text-white">
          <div className="w-full lg:w-2/3">
            <h1 className="text-2xl font-bold text-center drop-shadow-xl">
              Forgot Your Password?
            </h1>
            <form className="py-10" onSubmit={handleSubmit}>
              <div className="p-2">
                <label htmlFor="email" className="text-sm opacity-80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  onBlur={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-1 border-slate-500 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-fit mx-auto mt-5">
                <button
                  type="submit"
                  className="bg-blue-700 text-white rounded-md shadow-md p-2 border border-slate-400 disabled:bg-blue-300 disabled:cursor-not-allowed"
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

export default ForgotPassword;
