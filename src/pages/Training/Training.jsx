import { useMediaQuery } from "react-responsive";
import Container from "components/Container";
import Goal from "components/Goal";
import AddTraining from "components/AddTraining";
import TrainingList from "components/TrainingList";
// import Statistics from "components/Statistics";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import s from "./Training.module.scss";

const Training = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return (
    <section className={s.section}>
      <Container>
        <Goal />
        {!isMobile && <AddTraining />}
        <TrainingList />
        {/* {isMobile && <IconButton/>} */}
        {/* <Statistics/> */}
      </Container>
    </section>
  );
};

export default Training;
