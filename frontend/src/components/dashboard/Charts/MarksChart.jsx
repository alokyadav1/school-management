/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import generateRandomColor from '../../../utils/generateRandomColor';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function MarksChart({exams}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: exams.exam_name,
          },
        },
      };
      
      const labels = exams.marks.map((mark) => mark.subject);
      
      const data = {
        labels,
        datasets: [
          {
            label: 'percentage',
            data: exams.marks.map((mark) => mark.marks_obtained / mark.total_marks * 100),
            borderColor: generateRandomColor(),
            backgroundColor: generateRandomColor(),
          },
        ],
      };
    return ( 
        <Line data={data} options={options} />
     );
}

export default MarksChart;