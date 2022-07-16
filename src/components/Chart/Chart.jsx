// import s from "./Chart.module.scss";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["PLAN", "ACT"],
  datasets: [
    {
      data: [12, 19],
    },
  ],
};

const Chart = () => {
  return <Line data={data} />;
};

export default Chart;
