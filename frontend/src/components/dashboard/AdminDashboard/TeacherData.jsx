/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import axios from "../../../Axios/axios.js";
import UserContext from "../../../context/UserContext.js";
import AdminContext from "../../../context/AdminContext.js";
import { BsPersonFillAdd } from "react-icons/bs";
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

  const teacherData = data?.teachers;
  return (
    <>
      <ToastContainer />
      <div className="relative">
        <header className="p-1 flex items-center justify-evenly">
          <h1 className="text-2xl font-bold text-center">Teacher Data</h1>
          <div>
            <input
              type="text"
              placeholder="search"
              className="border-2 border-black rounded-full px-4 py-1"
            />
          </div>
          <div className="flex items-stretch">
            <button
              className="bg-blue-500 text-white rounded-s-lg p-2 shadow-lg"
              onClick={openModal}
            >
              Add Teacher
            </button>
            <div className="bg-blue-700 p-2 text-white flex items-center rounded-e-lg">
              <BsPersonFillAdd />
            </div>
          </div>
        </header>
        <hr className="my-2 border-gray-900" />
        <div>
          <Pagination data={teacherData} role="Teacher" />
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
