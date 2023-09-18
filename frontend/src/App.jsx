/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

import axios from "./Axios/axios.js"
// import Dashboard from './components/dashboard/DashBoard'
import Home from './components/pages/Home/Home'

import NotVerified from './components/pages/verify/NotVerified'
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword'
import SetPassword from './components/pages/ForgotPassword/SetPassword'

import VerifyEmail from './components/pages/verify/Verify'
import DashBoard from './components/dashboard/AdminDashboard/DashBoard'
import AdminDashboard from './components/dashboard/AdminDashboard/AdminDashboard'
import ViewDetail from './components/dashboard/AdminDashboard/ViewDetail'
import EditDetail from './components/dashboard/AdminDashboard/EditDetail'
import StudentData from './components/dashboard/AdminDashboard/StudentData'
import AddAcademicDetails from './components/dashboard/AdminDashboard/AddAcademicDetails'
import PerformanceReport from './components/dashboard/AdminDashboard/PerformanceReport'
import TeacherData from './components/dashboard/AdminDashboard/TeacherData'

import TeacherDashboard from './components/dashboard/TeacherDashboard'
import StudentDashboard from './components/dashboard/StudentDashboard'

import SignUp from './components/pages/SignUp/SignUp.jsx'
import UserContext from './context/UserContext'
import UserReducer from './reducer/UserReducer'


function App() {

  const [currentUser, dispatchUser] = useReducer(UserReducer, {});
  const userRole = localStorage.getItem("userRole")
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && userRole) {
      let path = "/admin/getAdmin";
      if (userRole == "Student") {
        path = "/student/getStudent"
      } else if (userRole == "Teacher") {
        path = "/teacher/getTeacher"
      }

      const fetchUser = async () => {
        try {
          const res = await axios.get(path, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          dispatchUser({
            type: "SET_USER",
            token: res.data.token,
            payload: {
              user: {
                email: res.data.admin.email
              },
              role: "Admin",
            }
          })
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole")
        }
      }
      fetchUser();
    }
  }, [userRole])


  const ProtectedAdmin = ({children}) => {
    if (userRole !== "Admin") {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <UserContext.Provider value={{ currentUser, dispatchUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* admin route */}
          <Route path='/admin' element={<ProtectedAdmin> <AdminDashboard /> </ProtectedAdmin>} >
            <Route index element={<DashBoard />} />
            <Route path='student' element={<StudentData />} />
            <Route path='teacher' element={<TeacherData />} />
            <Route path='student/academicDetails' element={<AddAcademicDetails />} />
            <Route path='student/viewdetail/:id' element={<ViewDetail />} />
            <Route path='student/editdetail/:id' element={<EditDetail />} />
            <Route path='student/performanceReport/:id' element={<PerformanceReport />} />
            <Route path='teacher/viewdetail/:id' element={<ViewDetail />} />
            <Route path='teacher/editdetail/:id' element={<EditDetail />} />
            <Route path='*' element={<h1>Not Found</h1>} />
          </Route>

          <Route path='/login' element={< SignUp />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
          <Route path='/notVerified' element={<NotVerified />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/setPassword/:token' element={<SetPassword />} />

          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
