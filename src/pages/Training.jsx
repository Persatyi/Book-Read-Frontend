import AddPages from "components/AddPages";
import Countdowns from "components/Countdowns";
import Container from "components/Container";

const Training = () => {
  // date = training.end
  return (
    <Container>
      <Countdowns date={Date.now() + 9000000} />
      <AddPages />
    </Container>
  );
};

export default Training;
