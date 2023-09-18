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
      count: data?.students?.length || 0,
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Total Teachers",
      count: data?.teachers?.length || 0,
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Total Standards",
      count: standard?.length || 0,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <div className="flex flex-col w-full md:w-auto md:flex-row md:flex-wrap gap-x-10 justify-start p-2 mb-7">
        {dashboardData.map((item, index) => (
          <div
            key={item.id}
            className={`${item.color} w-full mx-auto rounded-xl md:rounded-lg shadow-2xl flex-1 mb-4 md:mb-0 md:w-1/2 lg:w-1/3 xl:w-1/4`}
          >
            <div className="p-2 m-5 rounded-lg text-white">
              <h1 className="text-xl font-bold text-center">{item.title}</h1>
              <h1 className="text-4xl font-bold text-center">{item.count}</h1>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-2">
        <div className="w-full h-fit md:w-1/2 border border-gray-400 rounded-lg shadow-lg md:ml-2">
          <StudentStandard studentData={data?.students} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:flex-wrap justify-center md:py-5">
        {/* Gender Distribution of Students */}
        <div className="w-full md:w-2/5 h-fit p-2 border border-gray-400 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-2">
          <GenderDistribution inputData={data?.students} role="Students" />
        </div>
        {/* Gender Distribution of Teachers */}
        <div className="w-full md:w-2/5 h-fit md:p-2 border border-gray-400 rounded-lg shadow-lg">
          <GenderDistribution inputData={data?.teachers} role="Teachers" />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
