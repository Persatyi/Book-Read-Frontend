import AddPages from "components/AddPages";
import LineChart from "components/LineChart/LineChart";
import {
  // useGetBooksQuery,
  useGetResultsQuery,
  useGetTrainingQuery,
} from "redux/api/bookAPI";

const Training = () => {
  const { data: trainings = {} } = useGetTrainingQuery();
  const { data: statistic = {} } = useGetResultsQuery();

  // const { data: books = [] } = useGetBooksQuery();

  // const userStatistic = {};
  const chartData = {
    start: trainings?.start,
    end: trainings?.end,
    totalPages: statistic?.total,
    addedPages: statistic?.added,
    data: statistic?.data,
  };

  return trainings && statistic ? (
    <>
      <AddPages data={statistic} />
      <LineChart data={chartData} />
    </>
  ) : null;
};

export default Training;
