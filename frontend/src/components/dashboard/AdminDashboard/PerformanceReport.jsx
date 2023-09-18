/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserImg from "../../../assets/images/user.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsGraphUp, BsTable } from "react-icons/bs";
import MarksChart from "../Charts/MarksChart";
import OverallPerformance from "../Charts/OverallPerformance";
function PerformanceReport() {
  const { id } = useParams();
  const location = useLocation();
  const { data } = location.state;

  const [view, setView] = useState("table");

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="flex flex-wrap gap-2 items-center justify-between p-2 sticky top-0 bg-white">
        <button className="flex gap-x-2 items-center" onClick={handleBack}>
          <IoMdArrowRoundBack />
          <span>back</span>
        </button>
        <h1 className="text-2xl font-semibold text-center">
          Performance Report
        </h1>
        <div className="flex gap-x-5 items-center">
          <div className=" border-blue-700 border-2 rounded-full">
            <img
              src={data?.profile_pic ? data.profile_pic : UserImg}
              alt=""
              className="w-8 h-8 rounded-full border-slate-200 border"
            />
          </div>
          <h2 className="text opacity-80 font-semibold text-center capitalize">{`${data.first_name} ${data.last_name}`}</h2>
          <span className="bg-blue-700 rounded-lg text-sm px-2 text-white font-bold py-0 pt-1">
            {data?.standard || 5} <sup>th</sup>{" "}
          </span>
        </div>
      </header>
      <hr />
      {data?.academic_details.length > 0 ? (
        <main>
          <div className="flex justify-end gap-5 p-2">
            <button
              className={
                `p-2 text-white rounded-md font-bold` +
                (view === "graph" ? " bg-blue-700" : " bg-blue-300")
              }
              onClick={() => setView("graph")}
            >
              <BsGraphUp />
            </button>
            <button
              className={
                `p-2 text-white rounded-md font-bold` +
                (view === "table" ? " bg-blue-700" : " bg-blue-300")
              }
              onClick={() => setView("table")}
            >
              <BsTable />
            </button>
          </div>
          <div className="flex justify-between flex-wrap">
            {data.academic_details &&
              data?.academic_details.map((exam, index) => {
                return (
                  <div key={index} className=" flex-grow basis-1/2">
                    {view === "table" && (
                      <h2 className="text-center font-bold text-lg">
                        {exam.exam_name}
                      </h2>
                    )}
                    {view === "table" ? (
                      <table className="w-11/12 bg-slate-200 shadow-md mx-auto">
                        <thead className="bg-slate-400 w-full text-white">
                          <tr>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Marks</th>
                            <th className="px-6 py-4">Total Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exam.marks.map((mark, index) => {
                            return (
                              <tr
                                key={index}
                                className="text-center bg-white border-b hover:bg-slate-200"
                              >
                                <td className="px-4 py-2">{mark.subject}</td>
                                <td className="px-4 py-2">
                                  {mark.marks_obtained}
                                </td>
                                <td className="px-4 py-2">
                                  {mark.total_marks}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <div className="w-11/12 rounded-lg shadow-md mx-auto border border-slate-400">
                        <MarksChart exams={exam} />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          {/* <div className="p-12">
            {view === "graph" && <OverallPerformance data={data} />}
          </div> */}
        </main>
      ) : (
        <div className="mt-20 opacity-40">
          <h1 className="text-2xl font-bold text-center">
            No Academic Data Found
          </h1>
        </div>
      )}
    </>
  );
}

export default PerformanceReport;
