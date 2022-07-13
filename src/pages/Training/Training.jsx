import { useMediaQuery } from "react-responsive";
import Goal from "components/Goal";
import AddTraining from "components/AddTraining";
import TrainingList from "components/TrainingList";
// import Statistics from "components/Statistics";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

// import s from "./Training.module.scss";

const Training = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return (
    <>
      <Goal />
      {!isMobile && <AddTraining />}
      <TrainingList />
      {/* {isMobile && <IconButton/>} */}
      {/* <Statistics/> */}
    </>
  );
};

export default Training;
