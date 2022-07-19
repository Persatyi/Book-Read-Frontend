import s from "./Chart.module.scss";
import useWindowSize from "hooks/useWindowSize";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import dayjs from "dayjs";
import moment from "moment";

const LineChart = ({ data }) => {
  const { start, end, totalPages, addedPages, data: sets = [] } = data;
  const dateNow = dayjs();
  const trainingDays = dayjs(end).diff(start, "hour", true) / 24;
  const startDate = moment().utc(start);

  function getDates() {
    const dateArray = [dayjs(startDate).format("DD.MM.YYYY")];
    for (let i = 1; i <= trainingDays; i += 1) {
      const currentDate = dayjs(startDate).add(i, "day").format("DD.MM.YYYY");
      dateArray.push(currentDate);
    }
    return dateArray; // Отримуєм масив дат
  }

  // if (start) {
  // getDates();
  console.log("🚀 ~ getDates()", getDates());

  // }

  const averagePerDay = () => {
    const trainingRange = getDates().length;

    if (addedPages) {
      const total = Math.ceil(addedPages / trainingRange);
      return total === undefined ? 0 : total;
    } else {
      return 0;
    }
  };

  const size = useWindowSize();

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

      for (let i = 0; i <= getDates().length; i += 1) {
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
    // const dateNow = dayjs();
    const averageAmountOfPages = Math.ceil(totalPages / trainingDays);
    const prevAmount = [0];
    const finalDataSet = [];

    const stats = sets?.reduce((acc, el) => {
      const day = dayjs(el.date).format("DD.MM.YYYY");
      const pages = acc[day] ? acc[day] : [];
      return { ...acc, [day]: [...pages, el.pages] };
    }, {});

    if (stats) {
      const dataSet = Object.keys(stats).map((key) => {
        return {
          x: key,
          y: stats[key].reduce((acc, el) => acc + el, 0),
        };
      });

      const cycle = (range) => {
        for (let i = 0; i <= range; i += 1) {
          const element = dataSet.find(
            (el) => el.x === dayjs(startDate).format("DD.MM.YYYY")
          );

          if (element) {
            if (
              //<==== перший день якшо доданих сторінок більше чи менше за сьогодні то показати модалку
              getDates()[i] === element.x
            ) {
              finalDataSet.push({
                x: dayjs(startDate).format("DD.MM.YYYY"),
                y: averageAmountOfPages,
              });

              // if (element) {
              //   prevAmount.push(element.y);
              // } else {
              //   prevAmount.push(0);
              // }
            } else if (
              getDates()[i] ===
              dayjs(startDate).add(1, "day").format("DD.MM.YYYY") //другий день від початку
            ) {
              finalDataSet.push({
                x: dayjs(startDate).add(1, "day").format("DD.MM.YYYY"),
                y:
                  (totalPages - prevAmount[i]) / getDates().slice(i, -1).length,
              });

              // if (element) {
              //   prevAmount.push(element.y);
              // } else {
              //   prevAmount.push(0);
              // }
            } else {
              // iнші дні

              finalDataSet.push({
                x: getDates()[i],
                y: (totalPages - addedPages) / getDates().slice(i, -1).length, // here should be current date or date in cycle?
              });
              // if (element) {
              //   prevAmount.push(element.y);
              // } else {
              //   prevAmount.push(0);
              // }
            }
          }
        }
      };

      // if (Math.ceil(dateNow.diff(start, "day", true)) <= 7) {
      //   cycle(7);
      // }
      if (start) {
        cycle(getDates().length);
      }
    }

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
                text: `AMOUNT OF PAGES / DAY ${averagePerDay()}`,
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
