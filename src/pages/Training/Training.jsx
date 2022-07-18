import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "react-query";
import axios from "axios";

import Container from "components/Container";
import Goal from "components/Goal";
import AddTraining from "components/AddTraining";
import BookList from "components/BookList";
// import Statistics from "components/Statistics";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import s from "./Training.module.scss";

const Training = () => {
  const [chosenBooks, setChosenBooks] = useState([]);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { isLoading, data } = useQuery(["training"], getTraining);
  async function getTraining() {
    const { data } = await axios.get("/trainings");
    return data;
  }
  const isActiveTraining = !!data;
  const books = isActiveTraining ? data.books : chosenBooks;
  if (isLoading) return <div>Loading...</div>;

  return (
    <section className={s.section}>
      <Container>
        <Goal training={data} />
        {!isMobile && !isActiveTraining && (
          <AddTraining chosenBooks={chosenBooks} chooseBook={setChosenBooks} />
        )}
        <BookList books={books} className={s.books} />
        {/* {isMobile && <IconButton/>} */}
        {/* <Statistics/> */}
      </Container>
    </section>
  );
};

export default Training;
