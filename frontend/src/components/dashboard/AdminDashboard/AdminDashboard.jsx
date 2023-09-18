/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useContext, useReducer, useEffect } from "react";
// import UserContext from "../../../context/UserContext";
import AdminContext from "../../../context/AdminContext";
import AdminReducer from "../../../reducer/AdminReducer";
import StandardReducer from "../../../reducer/StandardReducer";
import { Outlet } from "react-router-dom";
// import Header from "../../Header/Header";
import SideBar from "./SideBar";

import axios from "../../../Axios/axios.js";

import { TiThMenu } from "react-icons/ti";
import { GrClose } from "react-icons/gr";

function AdminDashboard() {
  //   const { currentUser } = useContext(UserContext);
  const [data, dispatchData] = useReducer(AdminReducer, {
    students: [],
    teachers: [],
  });
  const [standard, dispatchStandard] = useReducer(StandardReducer, []);
  const [showMenu, setShowMenu] = React.useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const studentData = await axios.get("/admin/getStudents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (studentData.data.students?.length > 0) {
        dispatchData({
          type: "SET_STUDENTS",
          payload: studentData.data.students[0]?.studentInfo,
        });
      }

      //fetch teacher data
      const teacherData = await axios.get("/admin/getTeachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (teacherData.data.teachers?.length > 0) {
        dispatchData({
          type: "SET_TEACHERS",
          payload: teacherData.data.teachers[0]?.teacherInfo,
        });
      }

      //fetch standard data
      const standardData = await axios.get("/admin/getStandards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatchStandard({
        type: "SET_STANDARD",
        payload: standardData.data.standards,
      });
    };
    fetchData();
  }, []);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleEventPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <AdminContext.Provider
      value={{ data, dispatchData, standard, dispatchStandard }}
    >
      <div className="font-sans">
        {" "}
        {/* Use font-sans for San Francisco font */}
        <div className="relative md:px-1">
          {" "}
          {/* Add padding for Header */}
          {/* <Header /> */}
        </div>
        <div className="flex flex-col flex-wrap md:flex-row">
          <div className="sticky top-0 w-full md:w-1/4 lg:w-1/5 xl:w-1/6 md:px-2 rounded-lg md:shadow-lg md:bg-slate-200 z-50">
            {/* Adjust the width for Sidebar based on screen size */}
            <div className=" md:hidden flex flex-wrap items-center justify-between p-2 bg-slate-100">
              <span onClick={handleShowMenu} className="text-xl text-blue-400">
                <TiThMenu />
              </span>
              <h2 className="font-bold text-2xl text-blue-400 drop-shadow-lg">School Management</h2>
            </div>

            {/* mobile */}
            {showMenu && (
              <div
                className="md:hidden fixed top-0 left-0 h-screen w-screen bg-slate-900 bg-opacity-70"
                onClick={handleShowMenu}
              >
                <div
                  className="bg-white w-2/3 h-screen p-2 relative m-2 rounded-md shadow-2xl"
                  onClick={handleEventPropagation}
                >
                  <SideBar mobileEventHandler={handleShowMenu} />
                  <span
                    className="absolute top-0 -right-12 bg-slate-200 p-2 rounded-md  text-white cursor-pointer"
                    onClick={handleShowMenu}
                  >
                    <GrClose className="text-white text-2xl" />
                  </span>
                </div>
              </div>
            )}

            {/* desktop */}
            <div className="hidden md:block">
              <SideBar />
            </div>
          </div>
          <div className="main flex-1 overflow-auto rounded-lg ms-1">
            {/* Adjust the margin for the main content */}
            <Outlet />
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

// export default AdminDashboard;
export default AdminDashboard;
