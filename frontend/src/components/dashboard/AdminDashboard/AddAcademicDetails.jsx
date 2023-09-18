/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserImg from "../../../assets/images/user.png";
import AcademicForm from "./AcademicForm";
import CustomModal from "../../Modal/CustomModal";
import AdminContext from "../../../context/AdminContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddAcademicDetails() {
  const navigate = useNavigate();
  const { data, standard } = useContext(AdminContext);
  const [std, setStd] = useState(null);
  const [currentStudent, setCurrentStudent] = useState({}); // [student_id, student_name, student_standard]
  const [showModal, setShowModal] = useState(false);

  const notify = () =>
    toast.success("Academic Details Added Successfully!!", {
      position: "top-center",
    });

  const openModal = (stud) => {
    setShowModal(true);
    setCurrentStudent(stud);
  };
  const closeModal = () => {
    setShowModal(false);
    setCurrentStudent({});
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleStandard = (e) => {
    setStd(e.target.value);
  };

  const addSuccess = () => {
    notify();
    closeModal();
  }
  return (
    <>
      <ToastContainer />
      <header className="flex flex-wrap items-center gap-2 justify-between p-2 m-0 sticky -top-2 bg-transparent">
        <button className="flex gap-x-2 items-center" onClick={handleBack}>
          <IoMdArrowRoundBack />
          <span>back</span>
        </button>
        <div className="flex justify-center items-center">
          <h1 className="font-bold text-lg">Add Academic Details</h1>
        </div>
        <div>
          <label htmlFor="standard">Choose Standard: </label>
          <select name="standard" onChange={handleStandard}>
            <option>Select Standard</option>
            {standard.map((std) => {
              return (
                <option
                  value={std.standard}
                  key={std.standard}
                  selected={std === std.standard}
                >
                  {std.standard}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <hr />
      <main className="p-2">
        <div className="flex flex-wrap gap-y-2">
          {data?.students?.map((stud, index) => {
            return (
              <>
                {stud?.standard == std && (
                  <li className="flex items-center gap-x-3 w-full bg-green-200 rounded-md p-2">
                    <div className=" basis-5/6 flex items-center gap-x-2">
                      <span>{index + 1}.</span>
                      <img
                        src={stud?.profile_pic ? stud?.profile_pic : UserImg}
                        alt=""
                        className="rounded-full bg-white p-1 w-12 h-12"
                      />
                      <p>{`${stud.first_name} ${stud.last_name}`}</p>
                    </div>
                    <div className="basis-1/6 flex justify-end  mr-4">
                      <button
                        className="bg-blue-700 px-1 rounded-md text-white"
                        onClick={() =>
                          openModal({
                            id: stud._id,
                            name: `${stud.first_name} ${stud.last_name}`,
                            standard: stud.standard,
                          })
                        }
                      >
                        add
                      </button>
                    </div>
                  </li>
                )}
              </>
            );
          })}
        </div>
        {/* <AcademicForm /> */}
      </main>
      {showModal && (
        <CustomModal
          handleRequestClose={closeModal}
          modalTitle={`Add Academic Details`}
          name={currentStudent.name}
          standard={currentStudent.standard}
        >
          <AcademicForm id={currentStudent.id} addSuccess={addSuccess}/>
        </CustomModal>
      )}
    </>
  );
}

export default AddAcademicDetails;
