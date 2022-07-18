import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "react-query";
import axios from "axios";

import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Container from "components/Container";
import Goal from "components/Goal";
import AddTraining from "components/AddTraining";
import BookList from "components/BookList";
import IconButton, { TYPES } from "components/IconButton";
// import Statistics from "components/Statistics";

import s from "./Training.module.scss";

const Training = () => {
  const auth = useSelector(isAuth);
  const [chosenBooks, setChosenBooks] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { isLoading, data } = useQuery(["training"], getTraining, {
    enabled: !!auth,
  });
  async function getTraining() {
    const { data } = await axios.get("/trainings");
    return data;
  }
  const isActiveTraining = !!data;
  const books = isActiveTraining ? data.books : chosenBooks;
  const onAddButtonClick = () => {
    setIsAdd(true);
  };
  const onBackButtonClick = () => {
    setIsAdd(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isAdd)
    return (
      <section className={s.section}>
        <Container>
          <IconButton
            onClick={onBackButtonClick}
            label="Назад"
            type={TYPES.BACK}
            className={s.back}
          />
          <AddTraining chosenBooks={chosenBooks} chooseBook={setChosenBooks} />
        </Container>
      </section>
    );

  return (
    <section className={s.section}>
      <Container>
        <Goal training={data} isActiveTraining={isActiveTraining} />
        {!isMobile && !isActiveTraining && (
          <AddTraining chosenBooks={chosenBooks} chooseBook={setChosenBooks} />
        )}
        <BookList
          books={books}
          className={s.books}
          isActiveTraining={isActiveTraining}
        />
        {isMobile && !isActiveTraining && (
          <IconButton onClick={onAddButtonClick} label="Додати книгу" />
        )}
        {/* <Statistics/> */}
      </Container>
    </section>
  );
};

export default Training;
