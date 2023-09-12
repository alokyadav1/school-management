/* eslint-disable no-unused-vars */
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import {AiOutlineDashboard} from "react-icons/ai"
import {PiStudentFill} from "react-icons/pi"
import {FaChalkboardTeacher} from "react-icons/fa"
import "./admin.css";

function SideBar() {
  const navigate = useNavigate();
  const { currentUser, dispatchUser } = useContext(UserContext);
  const handleLogout = () => {
    dispatchUser({
      type: "DELETE_USER",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };
  return (
    <>
      <div className="py-2">{currentUser.user?.email}</div>
      <hr className=" border-white" />
      <div className="py-2">
        <ul>
          <li className=" rounded-md p-1 hover:bg-blue-200 my-1">
            <div>
              <AiOutlineDashboard className="inline-block mr-2" />
              <NavLink to="/admin/" className="w-full">
                Dashboard
              </NavLink>
            </div>
          </li>
          <li className=" rounded-md p-1 hover:bg-blue-200 my-1">
            <div className="flex justify-start items-center">
              <PiStudentFill className="inline-block mr-2" />
              <NavLink to="/admin/student">Student</NavLink>
            </div>
          </li>
          <li className=" rounded-md p-1 hover:bg-blue-200 my-1">
            <div className="flex justify-start items-center">
              <FaChalkboardTeacher className="inline-block mr-2" />
              <NavLink to="/admin/teacher">Teacher</NavLink>
            </div>
          </li>
        </ul>
      </div>
      <hr className="border-white"/>
      <div className="py-2 w-fit mx-auto">
        <button
          onClick={handleLogout}
          className="bg-blue-700 rounded-md p-2 text-white font-bold"
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default SideBar;
