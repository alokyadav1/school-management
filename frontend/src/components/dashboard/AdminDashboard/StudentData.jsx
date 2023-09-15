/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../../Axios/axios.js";
import UserContext from "../../../context/UserContext.js";
import AdminContext from "../../../context/AdminContext.js";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaFilter } from "react-icons/fa6";
import UserImg from "../../../assets/images/user.png";
import CustomModal from "../../Modal/CustomModal.jsx";
import Pagination from "../../Pagination/Pagination.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Add from "./Add.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");
function StudentData() {
  const { data } = useContext(AdminContext);
  const fakeData = {
    students: [
      {
        _id: "64a5477adaf00c749239ce1d",
        password:
          "$2b$10$ykXut2HMLjVZis1WPeFCaeVbQyDoqNFO/Kc3Nz1lFoI6IBSvrWvBO",
        first_name: "vivek",
        last_name: "pal",
        profile_img: UserImg,
        dob: "20-07-2000",
        email: "vivek.pal@gmail.com",
        mobile: 810405439,
        department: "MCA",
        course_start_date: "November 2022",
        course_end_date: "July 2024",
      },
      {
        _id: "64a5477adaf00c749239ce1d",
        password:
          "$2b$10$ykXut2HMLjVZis1WPeFCaeVbQyDoqNFO/Kc3Nz1lFoI6IBSvrWvBO",
        first_name: "vivek",
        last_name: "pal",
        profile_img: UserImg,
        dob: "20-07-2000",
        email: "vivek.pal@gmail.com",
        mobile: 810405439,
        department: "MCA",
        course_start_date: "November 2022",
        course_end_date: "July 2024",
      },
      {
        _id: "64a5477adaf00c749239ce1d",
        password:
          "$2b$10$ykXut2HMLjVZis1WPeFCaeVbQyDoqNFO/Kc3Nz1lFoI6IBSvrWvBO",
        first_name: "vivek",
        last_name: "pal",
        profile_img: UserImg,
        dob: "20-07-2000",
        email: "vivek.pal@gmail.com",
        mobile: 810405439,
        department: "MCA",
        course_start_date: "November 2022",
        course_end_date: "July 2024",
      },
      {
        _id: "64a5477adaf00c749239ce1d",
        password:
          "$2b$10$ykXut2HMLjVZis1WPeFCaeVbQyDoqNFO/Kc3Nz1lFoI6IBSvrWvBO",
        first_name: "vivek",
        last_name: "pal",
        profile_img: UserImg,
        dob: "20-07-2000",
        email: "vivek.pal@gmail.com",
        mobile: 810405439,
        department: "MCA",
        course_start_date: "November 2022",
        course_end_date: "July 2024",
      },
      {
        _id: "64a5477adaf00c749239ce1d",
        password:
          "$2b$10$ykXut2HMLjVZis1WPeFCaeVbQyDoqNFO/Kc3Nz1lFoI6IBSvrWvBO",
        first_name: "vivek",
        last_name: "pal",
        profile_img: UserImg,
        dob: "20-07-2000",
        email: "vivek.pal@gmail.com",
        mobile: 810405439,
        department: "MCA",
        course_start_date: "November 2022",
        course_end_date: "July 2024",
      },
      {
        _id: "64a5477adaf00c749239ce1d",
        password:
          "$2b$10$ykXut2HMLjVZis1WPeFCaeVbQyDoqNFO/Kc3Nz1lFoI6IBSvrWvBO",
        first_name: "vivek",
        last_name: "pal",
        profile_img: UserImg,
        dob: "20-07-2000",
        email: "vivek.pal@gmail.com",
        mobile: 810405439,
        department: "MCA",
        course_start_date: "November 2022",
        course_end_date: "July 2024",
      },
    ],
  };
  const studentData = data?.students;
  const [showModal, setShowModal] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState(new Array(6).fill(true));
  const [selectedDepartment, setSelectedDepartment] = useState([
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
  ]);
  // let selectedDepartment = ["MCA", "BCA", "BBA", "MBA"];
  const department = ["5th", "6th", "7th", "8th","9th","10th"];

  const notify = () =>
    toast.success(`Student Added Successfully`, {
      position: "top-center",
    });

    const addSuccess = () => {
      notify();
      closeModal();
    }
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleFilterChange = (e, index) => {
    const temp = [...filter];
    temp[index] = e.target.checked;
    setFilter(temp);
  };
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleFilter = () => {
    setShowFilter(false);
    console.log(filter);
    const temp = department.filter((item, index) => {
      if (filter[index]) {
        return department;
      }
    });
    setSelectedDepartment(temp);
    console.log(selectedDepartment);
  };

  return (
    <>
      <ToastContainer />
      <div className="relative">
        <header className="p-2 flex items-center justify-evenly sticky top-0 bg-white backdrop-blur-lg">
          <h1 className="text-2xl font-bold text-center">Student Data</h1>
          <div>
            <input
              type="text"
              placeholder="search"
              className="border-2 border-black rounded-full px-4 py-1"
            />
            {/* <CustomModal/> */}
          </div>
          <div className="flex items-stretch">
            <button
              className="bg-blue-500 text-white rounded-s-lg p-2 hover:bg-blue-700 shadow-lg"
              onClick={openModal}
            >
              Add Student
            </button>
            <div className="bg-blue-700 p-2 text-white flex items-center rounded-e-lg">
              <BsPersonFillAdd />
            </div>
          </div>
          <div>
            <NavLink
              to="academicDetails"
              className="p-2 rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-700"
            >
              Add Academic Details
            </NavLink>
          </div>
        </header>
        <hr className="my-2" />

        {/* filter */}
        <div className="p-2 relative flex justify-end">
          <div
            className="flex justify-end items-center w-fit cursor-pointer"
            onClick={toggleFilter}
          >
            <FaFilter className="text-blue-700 text-xl" />
          </div>
          {showFilter && (
            <div className="p-2 bg-white rounded-md shadow-2xl absolute top-full right-0 border-gray-500 border">
              <div>
                <h1 className="text-lg font-bold">Standard</h1>
              </div>
              <div>
                <ul>
                  {department.map((item, index) => {
                    return (
                      <li key={item}>
                        <label
                          htmlFor={item}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="checkbox"
                            name={item}
                            id={item}
                            value={item}
                            onChange={(e) => handleFilterChange(e, index)}
                            checked={filter[index]}
                          />
                          <span>{item}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
                <div className="w-full mt-2">
                  <button
                    className="w-full bg-blue-700 text-white p-2 rounded-md shadow-xl"
                    onClick={handleFilter}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <Pagination data={data?.students} role="Student"  />
        </div>
      </div>
      <div>
        {showModal && (
          <CustomModal handleRequestClose={closeModal} modalTitle="Add Student">
            <Add role="Student" addSuccess={addSuccess}/>
          </CustomModal>
        )}
      </div>
    </>
  );
}

export default StudentData;
