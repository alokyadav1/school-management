/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import generateRandomColor from "../../../utils/generateRandomColor";

function StudentStandard({studentData}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of students in each standard",
      },
    },
  };
  const labels = [5,6,7,8,9,10];

  const data = {
    labels:labels.map((std) => `${std}th`),
    datasets: [
      {
        label: 'Students Count',
        data: labels.map((std) => studentData?.filter((student) => (student?.standard || 5) === std).length),
        backgroundColor: generateRandomColor(),
      },
    ],
  };
  // console.log("studentData", studentData);

  return <Bar options={options} data={data} />;
}
export default StudentStandard;
