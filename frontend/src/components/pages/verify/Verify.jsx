/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "../../../Axios/axios";

function VerifyEmail() {
  const { token } = useParams();
  const [email, setEmail] = useState("alok");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const verifyEmail = async () => {
  //       setLoading(true);
  //     try {
  //       const res = await axios.get(`/admin/verify/${token}`);
  //       if (res.status === 200) {
  //         setEmail(res.data.email);
  //       } else if(res.status === 400) {
  //           setError(res.data.message);
  //       }
  //     } catch (error) {
  //       setError(error.response.data.message);
  //     }
  //   };
  //   verifyEmail();
  //   setLoading(false);
  // },[token]);
  if (email) {
    return (
      <div className="bg-slate-200 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white text-slate-800 w-full md:w-2/3 lg:w-1/2 rounded-md shadow-2xl p-5 text-center">
          <h1 className="text-black font-bold text-2xl">Account Activated</h1>
          <div className="w-full">
            <Player
              autoplay
              loop
              className="w-52 mx-auto"
              src="https://lottie.host/60ba7b64-202d-4993-ad16-44ea046f699e/gFVPbMTFwl.json"
            ></Player>
          </div>
          <h2 className="text-black font-bold text-lg">
            HELLO <span className="text-blue-700">{email} </span>,
          </h2>
          <div className="font-sans p-5 ">
            <p>
              Thank you, your email has been verified. Your account is not
              active.
            </p>
            <p>Please use the link below to login to your account.</p>
          </div>
          <div className="flex text-white w-fit mx-auto">
            <NavLink to="/login" className="bg-blue-500 p-2 px-10 rounded-sm">
              Login to your account
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="uppercase text-3xl font-bold">
          Email already verified or link expired
        </h1>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="uppercase text-3xl font-bold">Loading...</h1>
      </div>
    );
  }
}
export default VerifyEmail;
