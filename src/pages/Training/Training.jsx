import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

import { useAddTrainingMutation } from "redux/api/bookAPI";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Container from "components/Container";
import Goal from "components/Goal";
import AddTraining from "components/AddTraining";
import BookList from "components/BookList";
import IconButton, { TYPES } from "components/IconButton";
import Button from "components/Button";
// import Statistics from "components/Statistics";

import s from "./Training.module.scss";

const Training = () => {
  const isToken = !!axios.defaults.headers.common.Authorization;
  const [addTraining] = useAddTrainingMutation();
  const [chosenBooks, setChosenBooks] = useState([]);
  const [dates, setDates] = useState({ start: null, end: null });
  const [isAdd, setIsAdd] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { isLoading, data } = useQuery(["training", refetch], getTraining, {
    enabled: isToken,
    retry: false,
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
  const onAddTrainingClick = async () => {
    const { start, end } = dates;
    if (!chosenBooks.length) {
      toast.error("Додайте хоч одну книгу");
      return;
    }
    if (!start) {
      toast.error("Виберіть дату початку тренування");
      return;
    }
    if (!end) {
      toast.error("Виберіть дату закінчення тренування");
      return;
    }
    const bookIds = chosenBooks.map(({ _id }) => _id);
    const training = { start, end, books: bookIds };
    try {
      await addTraining(training);
      setRefetch(true);
    } catch (error) {
      toast.error("Не можу додати тренування, спробуйте ще раз");
    }
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
          <AddTraining
            chosenBooks={chosenBooks}
            chooseBook={setChosenBooks}
            dates={dates}
            setDates={setDates}
            setRefetch={setRefetch}
          />
        </Container>
      </section>
    );

  return (
    <section className={s.section}>
      <Container>
        <Goal
          training={isActiveTraining ? data : { ...dates, books: chosenBooks }}
          isActiveTraining={isActiveTraining}
        />
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
        {isMobile && !!chosenBooks?.length && (
          <Button
            type="button"
            text="Почати тренування"
            className={s.button}
            onClick={onAddTrainingClick}
          />
        )}
        {/* <Statistics/> */}
      </Container>
    </section>
  );
};

export default Training;
