import s from "./Chart.module.scss";
import useWindowSize from "hooks/useWindowSize";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import dayjs from "dayjs";

const LineChart = ({ data = [], className = "" }) => {
  const { start, end, data: sets, added: addedPages, total: totalPages } = data;
  const size = useWindowSize();

  const parsedStartDate = Date.parse(start);
  const parcedEndDate = Date.parse(end);
  const startDate = dayjs(parsedStartDate);
  const trainingDays =
    dayjs(parcedEndDate).diff(parsedStartDate, "hour", true) / 24;

  function getDates() {
    const dateArray = [dayjs(startDate).format("DD.MM.YYYY")];
    for (let i = 1; i <= trainingDays; i += 1) {
      const currentDate = dayjs(startDate).add(i, "day").format("DD.MM.YYYY");
      dateArray.push(currentDate);
    }
    return dateArray; // Отримуєм масив дат
  }

  const averagePerDay = () => {
    const trainingRange = Math.ceil(
      dayjs(dayjs()).diff(startDate, "day", true)
    );

    if (addedPages) {
      const total = Math.ceil(addedPages / trainingRange);
      return total === undefined ? 0 : total;
    } else {
      return 0;
    }
  };

  const middleware = () => {
    const stats = sets?.reduce((acc, el) => {
      const day = dayjs(el.date).format("DD.MM.YYYY");
      const pages = acc[day] ? acc[day] : [];
      return { ...acc, [day]: [...pages, el.pages] };
    }, {});

    const finalDataSet = [];

    if (stats) {
      const dataSet = Object.keys(stats).map((key) => {
        return {
          x: key,
          y: stats[key].reduce((acc, el) => acc + el, 0),
        };
      });

      for (let i = 0; i < dataSet.length; i += 1) {
        const day = dayjs(startDate).add(i, "day");
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

  const averageValue = () => {
    const finalDataSet = [];

    const cycle = (range) => {
      for (let i = 0; i < range; i += 1) {
        finalDataSet.push({
          x: getDates()[i],
          y: Math.ceil((totalPages - addedPages) / (getDates().length - i)),
        });
      }
    };

    cycle(getDates().length);

    return finalDataSet;
  };

  const userData = sets
    ? {
        datasets: [
          {
            id: "1",
            backgroundColor: "#091E3F",
            borderColor: "#091E3F",
            borderWidth: 2,
            data: averageValue(),
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
    : null;

  return (
    userData && (
      <div className={`${s.chart} ${className}`}>
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
                text: `AMOUNT OF PAGES / DAY  ${averagePerDay()}`,
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
