/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import Login from "./Login";
import Register from "./Register";
// import "../../../assets/styles/signup.css";

function SignUp() {
  const [signup, setSignup] = useState("login");
  let dashboard = "admin";
  if (localStorage.getItem("userRole") == "student") dashboard = "student";
  else if (localStorage.getItem("userRole") == "teacher") dashboard = "teacher";
  return (
    <>
    {localStorage.getItem("token") ? (
      <Navigate to={`/${dashboard}/`} />
    ) : null}
    <div className="px-2">
      <div>
        <h1 className="text-center font-bold text-4xl uppercase text-slate-700">
          Login
        </h1>
      </div>
      <div
        className="signup flex flex-col-reverse lg:flex-row gap-2 justify-center items-center lg:mt-8"
        style={{ fontFamily: "San Francisco" }}
      >
        <div className="w-full lg:w-2/5 player-container lg:mr-8">
          <Player
            autoplay
            loop
            className="player"
            src="https://assets1.lottiefiles.com/packages/lf20_jcikwtux.json"
          ></Player>
        </div>
        <div className="signup-form w-full lg:w-2/5 mt-5 lg:mt-0">
          <div className="flex flex-col lg:flex-row gap-2 py-5">
            <button
              onClick={() => setSignup("login")}
              className={signup === "login" ? "activeTab tab" : "tab"}
            >
              Login
            </button>
            <button
              onClick={() => setSignup("register")}
              className={signup === "register" ? "activeTab tab" : "tab"}
            >
              Register
            </button>
          </div>
          {signup === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  </>
  
  );
}

export default SignUp;
