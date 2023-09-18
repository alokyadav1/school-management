/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import axios from "../../../Axios/axios.js";
import AdminContext from "../../../context/AdminContext.js";

function AcademicForm({ id, addSuccess }) {
  const { dispatchData } = useContext(AdminContext);
  const [marks, setMarks] = useState([]);
  const [mark, setMark] = useState({});
  const [exam, setExam] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const addMarkDetail = (e) => {
    e.preventDefault();
    if (mark.subject && mark.marks_obtained && mark.total_marks) {
      setMarks([...marks, mark]);
      setMark({ subject: "", marks_obtained: "", total_marks: "" });
      setError(null);
      return;
    } else {
      setError("Please Enter Subject Details");
      return;
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setMark({ ...mark, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (exam === null) {
      setError("Please Enter Exam Name");
      return;
    }
    if (marks.length === 0) {
      setError("Please Enter Subject Details");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.patch(
        `/admin/addAcademicDetails/${id}`,
        { exam_name: exam, marks: marks },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatchData({
        type: "UPDATE_STUDENT",
        payload: {
          id,
          updatedStudent: res.data.updatedStudent,
        },
      });
      addSuccess();
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <p className="text-red-700 text-sm border border-slate-300 text-center font-bold bg-slate-200 p-2 rounded-md">
          {error}
        </p>
      )}
      {/* <span>id- {id}</span> */}
      <form onSubmit={handleSubmit} className="py-2">
        <div className="flex flex-col md:flex-row gap-2 p-1 items-center">
          <div className="md:w-2/6">
            <label htmlFor="exam_name">Exam Name:</label>
          </div>
          <div className="md:w-4/6">
            <input
              type="text"
              name="exam_name"
              id="exam_name"
              placeholder="Exam name"
              value={exam}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
              onChange={(e) => setExam(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-1">
          <div className="flex w-full md:w-4/12 flex-col justify-center">
            <label htmlFor="subject_name">Subject Name:</label>
            <input
              type="text"
              name="subject"
              value={mark.subject}
              id="subject_name"
              placeholder="Subject name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex w-full md:w-4/12 flex-col">
            <label htmlFor="marks_obtained">Marks Obtained:</label>
            <input
              type="number"
              min={0}
              name="marks_obtained"
              id="marks_obtained"
              value={mark.marks_obtained}
              placeholder="Marks obtained"
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
              onChange={handlechange}
              required
            />
          </div>
          <div className="flex w-full md:w-4/12 flex-col">
            <label htmlFor="total_marks">Total Marks:</label>
            <input
              type="number"
              min={0}
              name="total_marks"
              id="total_marks"
              value={mark.total_marks}
              placeholder="Total marks"
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline focus:outline-blue-500 focus:border-none border-slate-400"
              onChange={handlechange}
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-center p-2">
          <button
            className="bg-orange-700 text-white p-1 px-2 rounded-md font-semibold"
            onClick={addMarkDetail}
          >
            Add Subject
          </button>
        </div>
      </form>

      {marks.length > 0 && (
        <table className="w-full bg-slate-200 shadow-md mx-auto">
          <thead className="bg-slate-400 w-full text-white">
            <tr>
              <th>Subject</th>
              <th>Marks Obtained</th>
              <th>Total marks</th>
            </tr>
          </thead>
          {marks?.map((m, index) => {
            return (
              <>
                <tr className="text-center bg-white border-b hover:bg-slate-200">
                  <td className="px-4 py-2">{m.subject}</td>
                  <td className="px-4 py-2">{m.marks_obtained}</td>
                  <th className="px-4 py-2">{m.total_marks}</th>
                </tr>
              </>
            );
          })}
        </table>
      )}
      <hr />
      <footer className="pt-1 w-full flex gap-x-3 justify-end items-end">
        <button
          className="bg-blue-700 text-white border-2 border-blue-200 p-2 px-4 rounded-md font-semibold disabled:cursor-not-allowed"
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </button>
      </footer>
    </>
  );
}

export default AcademicForm;
