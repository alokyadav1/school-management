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

function AdminDashboard() {
  //   const { currentUser } = useContext(UserContext);
  const [data, dispatchData] = useReducer(AdminReducer, {
    students: [],
    teachers: [],
  });
  const [standard, dispatchStandard] = useReducer(StandardReducer, []);
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

      // console.log("student data", studentData.data.students[0]?.studentInfo);

      //fetch teacher data
      const teacherData = await axios.get("/admin/getTeachers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(teacherData.data.teachers?.length > 0){
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
  return (
    <AdminContext.Provider
      value={{ data, dispatchData, standard, dispatchStandard }}
    >
      <div style={{ fontFamily: "San Francisco" }}>
        {/* <div className="relative px-1">
                    <Header />
                </div> */}
        <div className="flex flex-wrap">
          <div className="md:w-fit md:min-w-40 px-2 rounded-lg shadow-lg bg-slate-200 m-1">
            <SideBar />
          </div>
          <div className="main flex-1 overflow-auto  rounded-lg ms-1">
            <Outlet />
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

// export default AdminDashboard;
export default AdminDashboard;
