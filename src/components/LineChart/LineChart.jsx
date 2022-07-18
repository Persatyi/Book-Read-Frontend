import s from "./Chart.module.scss";
import useWindowSize from "hooks/useWindowSize";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import dayjs from "dayjs";

const LineChart = ({ data }) => {
  const { start, end, totalPages, addedPages, data: sets = [] } = data;
  console.log("🚀 ~ addedPages", addedPages);

  const size = useWindowSize();

  const middleware = () => {
    const stats = sets?.reduce((acc, el) => {
      const day = dayjs(el.date).format("DD.MM.YYYY");
      const pages = acc[day] ? acc[day] : [];
      return { ...acc, [day]: [...pages, el.pages] };
    }, {});
    console.log("🚀 ~ stats", stats);

    const finalDataSet = [];

    if (stats) {
      const dataSet = Object.keys(stats).map((key) => {
        return {
          x: key,
          y: stats[key].reduce((acc, el) => acc + el, 0),
        };
      });
      console.log("🚀 ~ dataSet", dataSet);

      const dateNow = dayjs();
      const date2 = dayjs(start);
      const range = Math.ceil(dateNow.diff(date2, "day", true));

      for (let i = 0; i <= range; i += 1) {
        const day = dayjs(date2).add(i, "day");
        const element = dataSet.find(
          (el) => el.x === dayjs(day).format("DD.MM.YYYY")
        );
        if (element) {
          finalDataSet.push(element);
        } else {
          finalDataSet.push({ x: dayjs(day).format("DD.MM.YYYY"), y: 0 });
        }
      }
    }

    return finalDataSet;
  };

  const everageValue = () => {
    const trainingDays = Math.ceil(dayjs(end).diff(start, "day", true));

    const dateNow = dayjs();
    let averageAmount = totalPages / trainingDays;
    const startDate = dayjs(start);
    const finalDataSet = [];

    if (Math.ceil(dateNow.diff(start, "day", true)) <= 7) {
      for (let i = 0; i < 7; i += 1) {
        const day = dayjs(startDate).add(i, "day");
        finalDataSet.push({ x: day.format("DD.MM.YYYY"), y: averageAmount });
      }
      return finalDataSet;
    }
  };

  const userData = sets
    ? {
        datasets: [
          {
            id: "1",
            backgroundColor: "#091E3F",
            borderColor: "#091E3F",
            borderWidth: 2,
            data: everageValue(),
            label: "PLAN",
            pointRadius: 5,
            tension: 0.4,
          },
          {
            id: "2",
            backgroundColor: "#FF6B08",
            borderColor: "#FF6B08",
            borderWidth: 2,
            label: "ACT",
            pointRadius: 5,
            tension: 0.4,
            data: middleware(),
          },
        ],
      }
    : {};

  return (
    userData && (
      <div className={s.chart}>
        <Chart
          type="line"
          data={userData}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  color: "#091E3F",
                  display: true,
                  text: "TIME",
                  align: "end",
                  font: {
                    family: "'Montserrat', sans-serif",
                    weight: 600,
                    size: 12,
                    lineHeight: 1.22,
                  },
                },
                grid: {
                  borderColor: "#B1B5C2",
                  color: "#B1B5C2",
                  drawTicks: false,
                  drawOnChartArea: size.width < 768 ? false : true,
                },
                ticks: { display: false },
              },
              y: {
                display: false,
                min: 0,
                suggestedMax: 100,
              },
            },
            responsive: true,
            plugins: {
              legend: {
                display: false,
                position: "right",
                align: "center",
                boxWidth: 50,
                boxHeight: 30,
              },
              title: {
                display: true,
                position: "top",
                align: "start",
                text: `AMOUNT OF PAGES / DAY 10`,
                color: "#242A37",
                padding: 20,
                fullSize: false,
                font: {
                  family: "'Montserrat', sans-serif",
                  weight: 500,
                  size: 12,
                  lineHeight: 1.25,
                },
              },
            },
          }}
        />
      </div>
    )
  );
};

export default LineChart;
