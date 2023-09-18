/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../Axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function NotVerified() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let email = null;
  if (!location.state) {
    email = location.state?.email;
  }

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, [location.state, navigate]);
  const notify = () => {
    toast.success(`Email sent to ${location.state?.email}`, {
      position: "top-center",
    });
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/admin/sendEmail", {
        email: location.state?.email,
      });
      if (res.status === 200) {
        notify();
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-emerald-950 font-sans">
  <div className="w-full md:w-2/3 lg:w-1/3 h-auto md:h-fit bg-white rounded-lg shadow-lg p-5">
    <h1 className="text-xl md:text-2xl font-bold text-center p-3 md:p-5 text-red-600">
      Account Not Verified
    </h1>
    <div className="w-full">
      <Player
        autoplay
        loop
        className="w-2/3 md:w-1/2 mx-auto"
        src="https://lottie.host/fd239e75-1e6f-49c2-bfff-11c85325320d/XRoyYhFlys.json"
      ></Player>
    </div>
    <p className="text-base md:text-lg font-thin font-mono text-center">
      We've sent a verification link to your email:{" "}
      <span className="text-blue-600">
        {location.state?.email}
      </span>
    </p>
    <p className="text-base md:text-lg font-thin font-mono text-center">
      Please verify your email to continue.
    </p>
    <div className="flex text-white w-fit mx-auto py-3 md:py-5">
      <button
        className="bg-blue-500 p-2 md:p-3 px-8 md:px-10 rounded-sm uppercase disabled:bg-blue-300 disabled:cursor-not-allowed"
        onClick={sendEmail}
        disabled={loading}
      >
        Resend Email
      </button>
    </div>
  </div>
</div>

    </>
  );
}

export default NotVerified;
