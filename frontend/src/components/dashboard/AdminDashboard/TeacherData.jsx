/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import axios from "../../../Axios/axios.js";
import UserContext from "../../../context/UserContext.js";
import AdminContext from "../../../context/AdminContext.js";
import { BsPersonFillAdd } from "react-icons/bs";
import {LuMoreVertical} from "react-icons/lu";
import UserImg from "../../../assets/images/user.png";
import ProfileCard from "./ProfileCard.jsx";
import Pagination from "../../Pagination/Pagination.jsx";
import CustomModal from "../../Modal/CustomModal.jsx";
import Add from "./Add.jsx";
// import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Modal.setAppElement("#root");
function TeacherData() {
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
  const [showModal, setShowModal] = useState(false);
  const [showAction, setShowAction] = useState(false);

  const notify = () =>
    toast.success(`Teacher Added Successfully`, {
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

  const handleShowAction = () => {
    setShowAction(!showAction);
  };

  const teacherData = data?.teachers;
  return (
    <>
      <ToastContainer />
      <div className="relative min-h-screen">
      <header className="p-2 flex flex-wrap lg:flex-row items-center justify-between sticky top-0 bg-white">
          <h1 className="text-2xl font-bold text-center lg:text-left  mx-auto">
            Teacher Data
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
              className="font-bold relative md:hidden"
              onClick={handleShowAction}
            >
              <LuMoreVertical className="font-bolder" />
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
                  Add Teacher
                </button>
                <hr />

                {/* <div className="hidmd:bg-blue-700 p-2 text-white flex items-center rounded-lg">
                  <BsPersonFillAdd />
                </div> */}
              </div>
              
            </div>
          </div>
        </header>
        <hr className="my-2" />
        <div>
          <Pagination data={data.teachers} role="Teacher" />
        </div>

        {/* <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Add"
        // className="Modal"
      >
        <Add closeModal={closeModal} role="Teacher" />
      </Modal> */}
      </div>
      <div>
        {showModal && (
          <CustomModal handleRequestClose={closeModal} modalTitle="Add Teacher">
            <Add role="Teacher" addSuccess={addSuccess}/>
          </CustomModal>
        )}
      </div>
    </>
  );
}

export default TeacherData;
