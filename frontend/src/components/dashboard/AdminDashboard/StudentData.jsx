/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../../Axios/axios.js";
import UserContext from "../../../context/UserContext.js";
import AdminContext from "../../../context/AdminContext.js";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaFilter } from "react-icons/fa6";
import {LuMoreVertical} from "react-icons/lu";
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
  const [showAction, setShowAction] = useState(false);
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
  const department = ["5th", "6th", "7th", "8th", "9th", "10th"];

  const notify = () =>
    toast.success(`Student Added Successfully`, {
      position: "top-center",
    });

  const addSuccess = () => {
    notify();
    closeModal();
  };
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
  const toggleFilter = (e) => {
    e.stopPropagation();
    setShowFilter(!showFilter);
  };

  const handleFilter = (e) => {
    setShowFilter(false);
    const temp = department.filter((item, index) => {
      if (filter[index]) {
        return department;
      }
    });
    setSelectedDepartment(temp);
  };

  const handleShowAction = (e) => {
    e.stopPropagation();
    setShowAction(!showAction);
  };

  const handleHideAction = () => {
    setShowAction(false);
    setShowFilter(false);
  }

  return (
    <>
      <ToastContainer />
      <div className="relative z-10 min-h-screen" onClick={handleHideAction}>
        <header className="p-2 flex flex-wrap lg:flex-row items-center justify-between sticky top-0 bg-white">
          <h1 className="text-2xl font-bold text-center lg:text-left  mx-auto">
            Student Data
          </h1>
          <div className="flex-1 mt-4 lg:mt-0">
            <div className="relative m-auto flex justify-center">
              <input
                type="text"
                className="py-2 px-4 w-fit md:w-2/3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 m-auto"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
            </div>
          </div>
          <div className="z-50">
            <span
              className="font-bold relative md:hidden pt-2"
              onClick={handleShowAction}
            >
              <LuMoreVertical className="font-bold text-xl" />
            </span>
            <div
              className={
                showAction
                  ? "block absolute right-2 md:block md:relative border border-slate-500 bg-white rounded-lg shadow-xl p-2 md:bg-transparent md:border-none md:shadow-none"
                  : "hidden md:block md:bg-transparent"
              }
            >
              <div className="flex md:mt-4 lg:mt-0 items-stretch">
                <button
                  className="w-full text-black md:bg-blue-500 md:text-white rounded-lg md:p-2 md:hover:bg-blue-700 md:shadow-lg"
                  onClick={openModal}
                >
                  Add Student
                </button>
                <hr />

                {/* <div className="hidmd:bg-blue-700 p-2 text-white flex items-center rounded-lg">
                  <BsPersonFillAdd />
                </div> */}
              </div>
              <div>
                <Link to="academicDetails">Add Academic Details</Link>
              </div>
            </div>
          </div>
        </header>

        <hr className="my-2" />

        <div className="p-2 relative flex justify-end">
          <div
            className="flex justify-end items-center w-fit cursor-pointer"
            onClick={toggleFilter}
          >
            <FaFilter className="text-blue-700 text-xl -z-10" />
          </div>
          {showFilter && (
            <div className="p-2 bg-white rounded-md shadow-2xl absolute top-full right-0 border-gray-500 border z-20" onClick={(e) => e.stopPropagation()}>
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
        <div className=" -z-30">
          <Pagination
            data={data?.students}
            role="Student"
            filter={selectedDepartment}
          />
        </div>
      </div>

      <div>
        {showModal && (
          <CustomModal handleRequestClose={closeModal} modalTitle="Add Student">
            <Add role="Student" addSuccess={addSuccess} />
          </CustomModal>
        )}
      </div>
    </>
  );
}

export default StudentData;
