/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserImg from "../../../assets/images/user.png";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { LuMoreVertical } from "react-icons/lu";
import axios from "../../../Axios/axios.js";
import CustomModal from "../../Modal/CustomModal";
import AdminContext from "../../../context/AdminContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProfileCard({ role, data }) {
  const navigate = useNavigate();
  const [showAction, setShowAction] = useState(false);

  // view detail
  const viewDetail = (data) => {
    navigate(`viewdetail/${data._id}`, { state: { data, role } });
  };

  const handleAction = () => {
    setShowAction(!showAction);
  };
  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 px-2 md:px-5 py-2 rounded-xl flex flex-row justify-between items-center w-full relative " >
        <div
          onClick={(e) => viewDetail(data)}
          className="cursor-pointer flex flex-wrap flex-row gap-2 justify-start items-center flex-1"
        >
          <div className="flex items-center">
            <img
              src={data?.profile_pic ? data?.profile_pic : UserImg}
              alt=""
              className="rounded-full bg-white p-1 w-12 h-12"
            />
            <div>
              <p>
                {data.first_name} {data.last_name}
              </p>
              <span className="text-slate-500 text-sm italic">{data._id}</span>
            </div>
          </div>
          {role === "Student" && (
            <span className="bg-blue-700 rounded-lg text-sm px-2 text-white font-bold py-0 pt-1">
              {data?.standard} <sup>th</sup>
            </span>
          )}
        </div>
        <div className="hidden md:block">
          <UserAction data={data} role={role} />
        </div>
        <div className=" md:hidden absolute right-2 top-2 px-2">
          <span className="font-bold" onClick={handleAction}>
            {" "}
            <LuMoreVertical />{" "}
          </span>
          {/* <UserAction data={data} role={role} /> */}
          {showAction && (
            <div className="absolute right-0 bg-white p-2 rounded-md shadow-lg z-30">
              <UserAction data={data} role={role} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function UserAction({ data, role }) {
  const navigate = useNavigate();
  const { dispatchData } = useContext(AdminContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const notify = () =>
    toast.success(`${role} deleted Successfully`, {
      position: "top-center",
    });

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    if (role == "Student") {
      deleteStudent();
    } else {
      deleteTeacher();
    }
    setLoading(false);
    setShowModal(false);
    notify();
  };
  const deleteStudent = async () => {
    try {
      const res = await axios.delete(`/admin/removeStudent/${data._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatchData({
        type: "DELETE_STUDENT",
        payload: {
          id: data._id,
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };
  const deleteTeacher = async () => {
    try {
      const res = await axios.delete(`/admin/removeTeacher/${data._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatchData({
        type: "DELETE_TEACHER",
        payload: {
          id: data._id,
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  //edit detail
  const editDetail = (data) => {
    navigate(`editdetail/${data._id}`, { state: { data, role } });
  };

  //performance report
  const performanceReport = (data) => {
    navigate(`performanceReport/${data._id}`, { state: { data } });
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-center  gap-3 md:gap-x-3 mt-3 lg:mt-0">
        <button
          className="bg-orange-700 text-white rounded-lg px-2 cursor-pointer"
          onClick={openModal}
          disabled={loading}
        >
          <span className="flex items-center gap-2">
            <AiFillDelete />
            Delete
          </span>
        </button>
        <button
          className="bg-blue-700 text-white rounded-lg px-2"
          onClick={(e) => editDetail(data)}
        >
          <span className="flex items-center gap-2">
            <AiFillEdit /> Edit
          </span>
        </button>
        {role === "Student" && (
          <button
            className="bg-blue-700 text-white rounded-lg px-2"
            onClick={(e) => performanceReport(data)}
          >
            <span className="flex items-center gap-2">
              <BiSolidReport /> Report
            </span>
          </button>
        )}
      </div>
      <div>
        {showModal && (
          <CustomModal handleRequestClose={closeModal} modalTitle="Delete">
            <div>
              <p>Are you sure you want to delete?</p>
              <footer className="relative flex gap-x-3 gap-2 justify-end pt-2">
                <button
                  className="bg-transparent border-2 border-slate-300 text-black p-2 rounded-md font-semibold"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-700 text-white p-2 px-4 rounded-md font-semibold"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </footer>
            </div>
          </CustomModal>
        )}
      </div>
    </>
  );
}
export default ProfileCard;
