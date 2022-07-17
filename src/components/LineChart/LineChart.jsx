import s from "./Chart.module.scss";
import { useGetResultsQuery } from "redux/api/bookAPI";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineChart = () => {
  const { data = {} } = useGetResultsQuery();
  console.log("🚀 ~ data", data);
  const [userData, setUserData] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7],
    datasets: [
      {
        id: 1,
        label: "Planned",
        data: [1, 2, 3, 4, 5, 6, 7],
        borderColor: "rgb(255, 99, 132)",
      },
      {
        id: 2,
        label: "Pages read",
        data: [10, 20, 15, 25, 18, 22, 50],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
    ],
  });

  setUserData();
  return (
    <div className={s.chart}>
      <Line redraw={true} data={userData} />
    </div>
  );
};

export default LineChart;
