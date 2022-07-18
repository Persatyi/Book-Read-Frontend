import AddPages from "components/AddPages";
import LineChart from "components/LineChart/LineChart";
import {
  // useGetBooksQuery,
  useGetResultsQuery,
  useGetTrainingQuery,
} from "redux/api/bookAPI";

import Countdowns from "components/Countdowns";
import Container from "components/Container";

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
    <Container>
      <Countdowns date={Date.now() + 9000000} />
      <AddPages data={statistic} />
      <LineChart data={chartData} />
    </Container>
  ) : null;
}

export default Training;
