/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import generateRandomColor from "../../../utils/generateRandomColor";

ChartJS.register(ArcElement, Tooltip, Legend);

function GenderDistribution({inputData, role}) {
  let male = 0;
  let female = 0;
  let other = 0;
  inputData?.forEach((item) => {
    if(item?.gender == "male") male++;
    else if(item?.gender == "female") female++;
    else other++;
  });
  const data = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Count",
        data: [male, female, other],
        backgroundColor: [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 10, 140, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Gender Distribution of ${role}`,
      },
    },
  };
  return <Pie data={data} options={options} />;
}

export default GenderDistribution;
