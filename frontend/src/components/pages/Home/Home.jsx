/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../context/UserContext";

import Header from "./Header";
import GuideStep from "./GuideStep";
import SecurityCard from "./SecurityCard";
import FeatureCard from "./FeatureCard";
function Home() {
  const {currentUser} = useContext(UserContext);
  const guide = [
    {
      stepNumber: "1",
      title: "Register on Portal",
      description:
        "Start by registering on our portal. Click the 'Sign Up' button and provide your details.",
      imageSrc: "register-image.svg",
    },
    {
      stepNumber: "2",
      title: "Verify Your Email",
      description:
        "A verification email will be sent to your registered email address. Click the link in the email to verify your account.",
      imageSrc: "verify-email-image.svg",
    },
    {
      stepNumber: "3",
      title: "Login to Portal",
      description:
        "Once verified, log in to the portal using your registered email and password.",
      imageSrc: "login-image.svg",
    },
    {
      stepNumber: "4",
      title: "Add Students",
      description:
        "Click the 'Add Students' button to start adding student profiles to the system.",
      imageSrc: "add-students-image.svg",
    },
    {
      stepNumber: "5",
      title: "Add Teachers",
      description:
        "Similarly, click the 'Add Teachers' button to add teacher profiles and assignments.",
      imageSrc: "add-teachers-image.svg",
    },
    {
      stepNumber: "6",
      title: "Add Academic Details",
      description:
        "Complete the process by adding academic details of students, including enrollment and records.",
      imageSrc: "academic-details-image.svg",
    },
  ];

  const features = [
    {
      iconSrc: "feature-icon-1.svg",
      title: "Student Management",
      description:
        "Efficiently manage student information, enrollment, and academic records.",
    },
    {
      iconSrc: "feature-icon-2.svg",
      title: "Teacher Management",
      description:
        "Easily add, edit, and manage teacher profiles and assignments.",
    },
    {
      iconSrc: "feature-icon-3.svg",
      title: "Class Statistics",
      description:
        "Access charts displaying class-wise student count and gender distribution.",
    },
  ];

  const security = [
    {
      
      title: "Data Security",
      description:
        "We prioritize the security of your data with robust encryption and access controls. Your data is stored in secure, redundant data centers with regular backups to prevent data loss.",
    },
    {
      title: "User Verification",
      description:
        "Complete the verification process sent to your registered email to ensure your account's security. This additional step helps prevent unauthorized access to your account and keeps your data safe.",
    },
    {
      title: "Password Reset",
      description:
        "Forgot your password? No worries. You can reset it easily through your email. Click on the Forgot Password link on the login page, and we will send you a secure password reset link to your registered email address.",
    },
  ];
  return (
    <>
     <div>
  <Header currentUser={currentUser} />
  {/* Main Section with Gradient Background and Modern Design */}
  <section
    className={`flex-grow bg-gradient-to-br from-purple-700 via-pink-600 to-red-500 text-white py-16 relative`}
  >
    <div className="container mx-auto text-center">
      <h1 className="text-5xl font-extrabold mb-4">
        Welcome to School Management
      </h1>
      <p className="text-lg text-gray-300">
        Empowering Education through Innovation
      </p>
      <Link
        to="/login"
        className="mt-8 inline-block bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
      >
        {currentUser.user ? "Dashboard" : "Get Started"}
      </Link>
    </div>
  </section>

  <section className="container mx-auto my-12">
    <h2 className="text-3xl font-semibold mb-8 text-center">
      Key Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          iconSrc={feature.iconSrc}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  </section>

  <section className="bg-gray-100 py-12">
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Security
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {security.map((security) => (
          <SecurityCard
            key={security.title}
            title={security.title}
            description={security.description}
          />
        ))}
      </div>
    </div>
  </section>

  {/* Getting Started Guide */}
  <section className="bg-gray-100 py-16">
    <div className="container mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Getting Started Guide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
        {guide.map((step) => (
          <GuideStep
            key={step.stepNumber}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            imageSrc={step.imageSrc}
          />
        ))}
      </div>
    </div>
  </section>

  <footer className="bg-gray-300 p-4 mt-8">
    <div className="container mx-auto text-center">
      <p className="text-gray-600">© 2023 School Management</p>
    </div>
  </footer>
</div>

    </>
  );
}

export default Home;
