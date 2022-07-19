import { useReducer } from "react";
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

const ACTION_TYPES = {
  REFETCH: "refetch",
  ADD: "add",
  CHOOSE_BOOK: "chooseBook",
  SET_START: "setStart",
  SET_END: "setEnd",
};

const initialState = {
  chosenBooks: [],
  start: null,
  end: null,
  isAdd: false,
  isRefetch: false,
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.REFETCH:
      return { ...state, isRefetch: true };
    case ACTION_TYPES.ADD:
      return { ...state, isAdd: payload };
    case ACTION_TYPES.CHOOSE_BOOK:
      return { ...state, chosenBooks: [...state.chosenBooks, payload] };
    case ACTION_TYPES.SET_START:
      return { ...state, start: payload };
    case ACTION_TYPES.SET_END:
      return { ...state, end: payload };
    default:
      return state;
  }
};

const Training = () => {
  const isToken = !!axios.defaults.headers.common.Authorization;
  const [addTraining] = useAddTrainingMutation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { chosenBooks, start, end, isAdd, isRefetch } = state;
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { isLoading, data } = useQuery(["training", isRefetch], getTraining, {
    enabled: isToken,
    retry: false,
  });
  async function getTraining() {
    const { data } = await axios.get("/trainings");
    return data;
  }
  const chooseBook = (payload) =>
    dispatch({ type: ACTION_TYPES.CHOOSE_BOOK, payload });
  const setStart = (payload) =>
    dispatch({ type: ACTION_TYPES.SET_START, payload });
  const setEnd = (payload) => dispatch({ type: ACTION_TYPES.SET_END, payload });
  const setRefetch = () =>
    dispatch({ type: ACTION_TYPES.REFETCH, payload: true });

  const isActiveTraining = !!data;
  const books = isActiveTraining ? data.books : chosenBooks;
  const onAddButtonClick = () => {
    dispatch({ type: ACTION_TYPES.ADD, payload: true });
  };
  const onBackButtonClick = () => {
    dispatch({ type: ACTION_TYPES.ADD, payload: false });
  };
  const onAddTrainingClick = async () => {
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
        <Container className={s.container}>
          <IconButton
            onClick={onBackButtonClick}
            label="Назад"
            type={TYPES.BACK}
            className={s.back}
          />
          <AddTraining
            chosenBooks={chosenBooks}
            chooseBook={chooseBook}
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
            setRefetch={setRefetch}
          />
        </Container>
      </section>
    );

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <Goal
          training={
            isActiveTraining ? data : { start, end, books: chosenBooks }
          }
          isActiveTraining={isActiveTraining}
          className={s.goal}
        />
        {!isMobile && !isActiveTraining && (
          <AddTraining
            chosenBooks={chosenBooks}
            chooseBook={chooseBook}
            start={start}
            end={end}
            setStart={setStart}
            setEnd={setEnd}
            setRefetch={setRefetch}
            className={s.addTraining}
          />
        )}
        <BookList
          books={books}
          className={s.books}
          isActiveTraining={isActiveTraining}
          chosenBooks={chosenBooks}
          chooseBook={chooseBook}
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
