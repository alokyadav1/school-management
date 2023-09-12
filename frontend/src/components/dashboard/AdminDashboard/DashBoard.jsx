/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import AdminContext from "../../../context/AdminContext";
import StudentStandard from "../Charts/StudentStandard";
import GenderDistribution from "../Charts/GenderDistribution";
function DashBoard() {
  const { data, standard } = useContext(AdminContext);
  const dashboardData = [
    {
      id: 1,
      title: "Total Students",
      count: data?.students?.length,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Total Teachers",
      count: data?.teachers?.length,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Total Standards",
      count: standard?.length,
      color: "bg-yellow-500",
    },
  ];
  return (
    <div>
      <div className="flex gap-x-10 flex-wrap justify-start p-2 mb-7 flex-auto">
        {dashboardData.map((item, index) => {
          return (
            <>
              <div
                className={`${item.color} rounded-lg shadow-2xl basis-auto flex-grow`}
              >
                <div key={item.id} className=" p-2 m-5 rounded-lg text-white">
                  <h1 className="text-xl font-bold text-center">
                    {item.title}
                  </h1>
                  <h1 className="text-4xl font-bold text-center">
                    {item.count}
                  </h1>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="mb-2">
        <div className="w-1/2 p-2 border border-gray-400 rounded-lg shadow-lg ml-2">
          <StudentStandard studentData={data?.students} />
        </div>
      </div>
      <div className="flex items-center flex-wrap justify-around py-5">
        {/* Gender Distribution of Students */}
        <div className="w-2/5 h-fit p-2 border border-gray-400 rounded-lg shadow-lg ml-2 flex justify-center">
          <GenderDistribution inputData={data?.students} role="Students"/>
        </div>
        {/* Gender Distribution of Students */}
        <div className="w-2/5 h-fit p-2 border border-gray-400 rounded-lg shadow-lg ml-2 flex justify-center">
          <GenderDistribution inputData={data?.teachers} role="Teachers"/>
        </div>

      </div>
    </div>
  );
}

export default DashBoard;
