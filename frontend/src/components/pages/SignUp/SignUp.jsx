/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Login from './Login';
import "../../../assets/styles/signup.css"

function SignUp() {
    let dashboard = "admin"
    if(localStorage.getItem("userRole") == "student") dashboard = "student"
    else if(localStorage.getItem("userRole") == "teacher") dashboard = "teacher"
    return (
        <>
            {
                localStorage.getItem("token") ? <Navigate to={`/${dashboard}/`} /> : null
            }
            <div>
                <div>
                    <h1 className='text-center font-bold text-4xl uppercase text-slate-700'> Login</h1>
                </div>
                <div className='signup flex gap-2 justify-center items-center' style={{ fontFamily: "San Francisco" }}>
                    <div className='w-2/5 player-container'>
                        <Player
                            autoplay
                            loop
                            className='player'
                            src="https://assets1.lottiefiles.com/packages/lf20_jcikwtux.json"

                        >
                        </Player>
                    </div>
                    <div className='signup-form w-2/5 mt-5'>
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;