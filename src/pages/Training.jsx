import AddPages from "components/AddPages";
import LineChart from "components/LineChart/LineChart";
import {
  // useGetBooksQuery,
  useGetResultsQuery,
  useGetTrainingsQuery,
} from "redux/api/bookAPI";

const Training = () => {
  const { data: trainings = {} } = useGetTrainingsQuery();

  // const { data: books = [] } = useGetBooksQuery();
  // console.log("🚀 ~ books", books);
  const { data: statistic = {} } = useGetResultsQuery();

  // const userStatistic = {};
  const newData = {
    start: trainings?.start,
    end: trainings?.end,
    totalPages: statistic?.total,
    addedPages: statistic?.added,
    data: statistic.data,
  };

  return trainings && statistic ? (
    <>
      <AddPages data={statistic} />
      <LineChart data={newData} />
    </>
  ) : null;
};

export default Training;
