/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Oval } from "react-loader-spinner";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import AdminContext from "../../../context/AdminContext.js";
import axios from "../../../Axios/axios.js";
import UserImg from "../../../assets/images/user.png";
function Add({ addSuccess, role }) {
  const today = new Date().toISOString().split("T")[0];
  const { dispatchData, standard } = useContext(AdminContext);
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!checkPassword()) {
      return;
    }
    if (role == "Student") {
      addStudent();
    } else {
      addTeacher();
    }
  };

  const checkPassword = (e) => {
    const confirmPassword = e?.target?.value || formData.confirm_password;
    if (formData.password !== confirmPassword) {
      setMessage("passwords do not match");
      return false;
    } else {
      setMessage("");
      return true;
    }
  };

  const addStudent = async () => {
    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData.last_name);
    data.append("gender", formData.gender);
    data.append("email", formData.email);
    data.append("dob", formData.dob);
    data.append("mobile", formData.mobile);
    data.append("standard", formData.standard);
    data.append("password", formData.password);
    data.append("image", avatar);
    try {
      const res = await axios.post("/admin/addStudent", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatchData({
        type: "ADD_STUDENT",
        payload: res.data.student,
      });
      addSuccess();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const addTeacher = async () => {
    const data = new FormData();
    data.append("first_name", formData.first_name);
    data.append("last_name", formData?.last_name);
    data.append("gender", formData.gender);
    data.append("email", formData.email);
    data.append("dob", formData?.dob);
    data.append("mobile", formData?.mobile);
    data.append("password", formData.password);
    data.append("image", avatar);
    try {
      const res = await axios.post("/admin/addTeacher", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatchData({
        type: "ADD_TEACHER",
        payload: res.data.teacher,
      });
      addSuccess();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative w-full flex items-center justify-center z-20">
      <div className=" p-5  text-center w-auto ">
        {error && <p className="text-red-700 text-sm">{error}</p>}
        <form
          action=""
          className="flex flex-wrap text-black "
          onSubmit={handleAdd}
        >
          <div className="flex flex-wrap justify-center items-center  gap-2 text-white">
            <div className="md:w-4/5 mx-auto">
              <div className="w-fit mx-auto">
                <input
                  type="file"
                  accept="image/*"
                  src=""
                  alt=""
                  id="choose-avatar"
                  className="hidden"
                  onChange={handleAvatar}
                />
                <label
                  htmlFor="choose-avatar"
                  className=" cursor-pointer relative  "
                >
                  <img
                    src={avatar ? previewUrl : UserImg}
                    alt="preview"
                    className="rounded-full border-2 object-cover w-16 h-16 border-1 border-slate-400 p-1"
                  />
                  <MdOutlineAddCircle className="text-blue-700 absolute bottom-1 right-1" />
                </label>
              </div>
              <p>file - {avatar?.name}</p>
            </div>
            <div className="flex gap-x-2 w-full">
              <div className="flex-1">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  First Name <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="first name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  Last Name <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="last name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="md:w-full mx-auto">
              <label className="block text-sm font-medium leading-6 text-start text-black">
                Gender <span className="text-sm text-red-700">*</span>
              </label>
              <div className="text-black flex gap-x-5">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={formData?.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={formData?.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <label htmlFor="female">Female</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                    checked={formData?.gender === "other"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-x-2">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  email <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  Mobile No. <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  name="mobile"
                  type="number"
                  minLength={10}
                  maxLength={10}
                  placeholder="mobile number"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="md:w-full mx-auto">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-start text-black"
              >
                Date Of Birth{" "}
              </label>
              <input
                name="dob"
                type="date"
                max={today}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </div>

            {role === "Student" && (
              <div className="md:w-full mx-auto">
                <label
                  htmlFor="standard"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  Standard <span className="text-sm text-red-700">*</span>
                </label>
                <select
                  name="standard"
                  id="standard"
                  required
                  className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-none focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) =>
                    setFormData({ ...formData, standard: e.target.value })
                  }
                >
                  <option selected>Select Standard</option>
                  {standard.map((std) => {
                    return (
                      <option value={std.standard} key={std.standard}>
                        {std.standard}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
            <div className="flex flex-wrap w-full gap-x-2">
              <div className="flex-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  Password <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-start text-black"
                >
                  Confirm Password{" "}
                  <span className="text-sm text-red-700">*</span>
                </label>
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    });
                    checkPassword(e);
                  }}
                />
              </div>
            </div>
            <p className="text-red-700 text-sm">{message}</p>
          </div>
          {/* <button
                        className="bg-white text-blue-700 mx-auto mt-2 rounded-full px-4 py-1 disabled:cursor-not-allowed"
                        type='submit'
                        disabled={loading}
                    >Add</button> */}
          <footer className="pt-5 w-full flex gap-x-3 justify-end items-end">
            <button
              className="bg-blue-700 text-white border-2 border-blue-200 p-2 px-4 rounded-md font-semibold disabled:cursor-not-allowed"
              type="submit"
              disabled={loading}
            >
              Save
            </button>
          </footer>
          {loading && (
            <div>
              <div className="absolute top-0 left-0 w-full h-full bg-slate-500 opacity-60"></div>
              <div className=" z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Oval
                  ariaLabel="loading-indicator"
                  height={100}
                  width={100}
                  strokeWidth={3}
                  strokeWidthSecondary={2}
                  color="blue"
                  secondaryColor="white"
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Add;
