import { useReducer } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery, useMutation } from "react-query";
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
import LineChart from "components/LineChart/LineChart";
import AddPages from "components/AddPages";
// import Statistics from "components/Statistics";

import s from "./Training.module.scss";
import Timer from "components/Timer";

const ACTION_TYPES = {
  REFETCH: "refetch",
  ADD: "add",
  CHOOSE_BOOK: "chooseBook",
  DELETE_BOOK: "deleteBook",
  SET_START: "setStart",
  SET_END: "setEnd",
  UPDATE: "update",
};

const initialState = {
  chosenBooks: [],
  start: null,
  end: null,
  isAdd: false,
  isRefetch: false,
  updateStats: false,
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.REFETCH:
      return { ...state, isRefetch: true };
    case ACTION_TYPES.ADD:
      return { ...state, isAdd: payload };
    case ACTION_TYPES.CHOOSE_BOOK:
      return { ...state, chosenBooks: [...state.chosenBooks, payload] };
    case ACTION_TYPES.DELETE_BOOK:
      return {
        ...state,
        chosenBooks: state.chosenBooks.filter(({ _id }) => _id !== payload),
      };
    case ACTION_TYPES.SET_START:
      return { ...state, start: payload };
    case ACTION_TYPES.SET_END:
      return { ...state, end: payload };
    case ACTION_TYPES.UPDATE:
      console.log("Reducer");
      return { ...state, updateStats: !state.updateStats };
    default:
      return state;
  }
};

const Training = () => {
  const isToken = !!axios.defaults.headers.common.Authorization;
  const [addTraining] = useAddTrainingMutation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { chosenBooks, start, end, isAdd, isRefetch, updateStats } = state;
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { isLoading, data } = useQuery(["training", isRefetch], getTraining, {
    enabled: isToken,
    retry: false,
  });

  const { data: response } = useQuery(["results", updateStats], getResults, {
    enabled: isToken,
    retry: false,
  });

  const addResults = async (data) => {
    const result = await axios.post("/results", data);
    return result;
  };

  const { mutate } = useMutation(addResults);

  async function getTraining() {
    const { data } = await axios.get("/trainings");
    return data;
  }

  async function getResults() {
    const { data } = await axios.get("/results");
    return data;
  }

  const chooseBook = (payload) =>
    dispatch({ type: ACTION_TYPES.CHOOSE_BOOK, payload });
  const deleteBook = (payload) =>
    dispatch({ type: ACTION_TYPES.DELETE_BOOK, payload });
  const setStart = (payload) =>
    dispatch({ type: ACTION_TYPES.SET_START, payload });
  const setEnd = (payload) => dispatch({ type: ACTION_TYPES.SET_END, payload });
  const setRefetch = () =>
    dispatch({ type: ACTION_TYPES.REFETCH, payload: true });
  const setUpdate = () => dispatch({ type: ACTION_TYPES.UPDATE });

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
  const date = new Date();
  const nextYear = new Date(
    new Date(`${date.getFullYear() + 1}-01-01`).getTime() +
      date.getTimezoneOffset() * 60 * 1000
  );

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
        {isActiveTraining && (
          <div className={s.timers}>
            <Timer title="До закінчення року залишилось" date={nextYear} />
            <Timer title="До досягнення мети залишилось" date={data.end} />
          </div>
        )}
        <Goal
          training={
            isActiveTraining ? data : { start, end, books: chosenBooks }
          }
          isActiveTraining={isActiveTraining}
          className={isActiveTraining ? s.activeGoal : s.goal}
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
            isActiveTraining={isActiveTraining}
            deleteBook={deleteBook}
            className={s.addTraining}
          />
        )}
        {(isActiveTraining || isMobile) && (
          <BookList
            books={books}
            isActiveTraining={isActiveTraining}
            chosenBooks={chosenBooks}
            deleteBook={deleteBook}
          />
        )}
        {isMobile && !!chosenBooks?.length && (
          <Button
            type="button"
            text="Почати тренування"
            className={s.button}
            onClick={onAddTrainingClick}
          />
        )}
        <LineChart data={response} className={s.chart} />
        {isActiveTraining && (
          <AddPages
            updateResults={mutate}
            setUpdate={setUpdate}
            data={response}
            className={s.addPages}
          />
        )}
        {isMobile && !isActiveTraining && (
          <IconButton onClick={onAddButtonClick} label="Додати книгу" />
        )}
      </Container>
    </section>
  );
};

export default Training;
