import { useReducer } from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery, useMutation } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";

import { useAddTrainingMutation } from "redux/api/bookAPI";

import useTranslation from "hooks/useTranslation";
import useRefreshToken from "hooks/useRefreshToken";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Container from "components/Container";
import Goal from "components/Goal";
import AddTraining from "components/AddTraining";
import BookList from "components/BookList";
import IconButton, { TYPES } from "components/IconButton";
import Button from "components/Button";
import LineChart from "components/LineChart/LineChart";
import AddPages from "components/AddPages";
import Timer from "components/Timer";

import s from "./Training.module.scss";

const ACTION_TYPES = {
  REFETCH: "refetch",
  ADD: "add",
  CHOOSE_BOOK: "chooseBook",
  DELETE_BOOK: "deleteBook",
  SET_START: "setStart",
  SET_END: "setEnd",
  UPDATE: "update",
  RESET: "reset",
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
      return { ...state, isRefetch: !state.isRefetch };
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
      return { ...state, updateStats: !state.updateStats };
    case ACTION_TYPES.RESET:
      return { ...initialState };
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
  const { isLoading, data = {} } = useQuery(
    ["training", isRefetch],
    getTraining,
    {
      enabled: isToken,
      retry: false,
    }
  );
  const checkRefreshToken = useRefreshToken();
  const { t } = useTranslation("Training");

  const { data: response } = useQuery(["results", updateStats], getResults, {
    enabled: isToken,
    retry: false,
  });

  const addResults = async (data) => {
    const result = await axios.post("/results", data);
    return result;
  };

  const { mutateAsync } = useMutation(addResults);

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

  const isActiveTraining = !!Object.keys(data).length;
  const books = isActiveTraining ? data.books : chosenBooks;
  const onAddButtonClick = () => {
    dispatch({ type: ACTION_TYPES.ADD, payload: true });
  };
  const onBackButtonClick = () => {
    dispatch({ type: ACTION_TYPES.ADD, payload: false });
  };
  const resetState = () => {
    dispatch({ type: ACTION_TYPES.RESET });
  };
  const onAddTrainingClick = async () => {
    if (!chosenBooks.length) {
      toast.error(t.bookError);
      return;
    }
    const bookIds = chosenBooks.map(({ _id }) => _id);
    const training = { start, end, books: bookIds };
    try {
      await checkRefreshToken();
      await addTraining(training);
      resetState();
      setRefetch();
    } catch (error) {
      toast.error(t.error);
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
            label={t.back}
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
            <Timer title={t.tillNextYear} date={nextYear} />
            <Timer title={t.tillEnd} date={data.end} />
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
            setUpdate={setUpdate}
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
            text={t.button}
            className={s.button}
            onClick={onAddTrainingClick}
          />
        )}
        <LineChart data={response} className={s.chart} />
        {isActiveTraining && (
          <AddPages
            updateResults={mutateAsync}
            setUpdate={setUpdate}
            setRefetch={setRefetch}
            data={response}
            className={s.addPages}
            resetState={resetState}
          />
        )}
        {isMobile && !isActiveTraining && (
          <IconButton onClick={onAddButtonClick} label={t.addBook} />
        )}
      </Container>
    </section>
  );
};

export default Training;
