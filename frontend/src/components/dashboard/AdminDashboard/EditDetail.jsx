/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import AdminContext from "../../../context/AdminContext.js";
import axios from "../../../Axios/axios.js";
import UserImg from "../../../assets/images/user.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditDetail() {
  const navigate = useNavigate(null);
  const { id } = useParams();
  const location = useLocation();
  const { data, role } = location.state;
  const { dispatchData } = useContext(AdminContext);
  const [formData, setFormData] = useState(data);
  const [avatar, setAvatar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangedPassword] = useState(false);
  const date = new Date();
  const today = new Date().toISOString().split("T")[0];
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const formattedMonth =
    m.toLocaleString().length == 1
      ? "0" + m.toLocaleString()
      : m.toLocaleString();
  const month = y + "-" + formattedMonth;

  const notify = () =>
    toast.success(`${role} Updated Successfully!!`, {
      position: "top-center",
    });

  const handleBack = () => {
    navigate(-1);
  };
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!checkPassword() && changePassword) {
      setLoading(false);
      return;
    }
    if (role == "Student") {
      updateStudent();
    } else {
      updateTeacher();
    }

    setLoading(false);
  };
  const checkPassword = (e) => {
    const confirmPassword = e?.target?.value || formData.confirm_password;
    if (formData.password !== confirmPassword && changePassword) {
      setMessage("passwords do not match");
      return false;
    } else {
      setMessage("");
      return true;
    }
  };
  const updateStudent = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `/admin/updateStudent/${data._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatchData({
        type: "UPDATE_STUDENT",
        payload: {
          id: data._id,
          updatedStudent: res.data.updatedStudent,
        },
      });
      setSuccess("Student Updated Successfully!!");
      notify();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const updateTeacher = async() => {
    setError("");
    try {
      const res = await axios.patch(
        `/admin/updateTeacher/${data._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatchData({
        type: "UPDATE_TEACHER",
        payload: {
          id: data._id,
          updatedTeacher: res.data.updatedTeacher,
        },
      });

      setSuccess("Teacher Updated Successfully!!");
      notify();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <header className="flex p-2 bg-slate-100 sticky top-0 z-10">
        <button className="flex gap-x-2 items-center" onClick={handleBack}>
          <IoMdArrowRoundBack />
          <span>back</span>
        </button>
        <h1 className="text-xl flex-1 font-semibold uppercase text-center ">
          Edit Detail -{" "}
          <span className="lowercase italic text-slate-400 opacity-60 underline ">{id}</span>
        </h1>
      </header>
      <ToastContainer />
      <div>
        <form
          action=""
          className="flex flex-col md:flex-row flex-wrap justify-center items-start "
          onSubmit={handleSave}
        >
          <div className="p-2 mx-auto flex-1 sticky top-12 md:mt-10 text-center">
            <div className="w-fit mx-auto max-w-xs border-4 border-red-700 rounded-full">
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
                className=" cursor-pointer relative "
              >
                <img
                  src={
                    avatar
                      ? previewUrl
                      : data?.profile_pic
                      ? data?.profile_pic
                      : UserImg
                  }
                  alt="preview"
                  className="rounded-full border-2 border-white object-cover w-32 h-32 md:w-fit md:h-fit bg-slate-400"
                />
                <MdOutlineAddCircle className="text-black absolute bottom-1 right-1 text-2xl" />
              </label>
            </div>
            <p className="mt-5">file - {avatar?.name}</p>
          </div>
          <div className="w-full border flex-1 text-gray-900 p-5 flex flex-col gap-5">
            {error && (
              <div>
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div>
                <p>{success}</p>
              </div>
            )}
            <div className=" mx-auto w-full">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium leading-6 text-start"
              >
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                value={formData.first_name}
                placeholder="first name"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </div>
            <div className=" mx-auto w-full">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium leading-6 text-start"
              >
                Last Name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                value={formData.last_name}
                placeholder="last name"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </div>
            <div className="md:w-full mx-auto">
              <label className="block text-sm font-medium leading-6 text-start text-black">
                Gender{" "}
                <span className="text-sm text-red-700">
                  * {!formData.gender && "Not Available"}
                </span>
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
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-start"
              >
                email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                placeholder="email"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium leading-6 text-start"
              >
                Mobile No.
              </label>
              <input
                name="mobile"
                type="number"
                minLength={10}
                maxLength={10}
                value={formData.mobile}
                placeholder="mobile number"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>
            <div className=" mx-auto w-full">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-start"
              >
                Date Of Birth{" "}
              </label>
              <input
                name="dob"
                type="date"
                max={today}
                value={formData.dob}
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-start"
              >
                Password{" "}
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  e.target.value.length > 0
                    ? setChangedPassword(true)
                    : setChangedPassword(false);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium leading-6 text-start"
              >
                Confirm Password{" "}
              </label>
              <input
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    confirm_password: e.target.value,
                  });
                  checkPassword(e);
                }}
              />
            </div>
            <p className="text-red-700 text-sm">{message}</p>
            <button
              className="bg-blue-700 text-white mx-auto mt-2 rounded-full px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={loading || formData === data}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDetail;
