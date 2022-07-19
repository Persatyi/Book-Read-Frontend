import { useMemo } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import { useAddTrainingMutation, useBooksQuery } from "redux/api/bookAPI";

import Title from "components/Title";
import DatePickerField from "components/DatePickerField";
import Select from "components/Select";
import Button from "components/Button";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import sprite from "assets/images/sprite.svg";

import s from "./AddTraining.module.scss";

const AddTraining = ({
  chosenBooks,
  chooseBook,
  dates,
  setDates,
  setRefetch,
  className = "",
}) => {
  const { data, isSuccess, isFetching } = useBooksQuery();
  const [addTraining] = useAddTrainingMutation();
  const isMobile = useMediaQuery(MOBILE_ONLY);

  const bookIds = useMemo(
    () => chosenBooks.map(({ _id }) => _id),
    [chosenBooks]
  );
  const allBooks = useMemo(
    () =>
      data
        ?.filter(({ _id }) => !bookIds.includes(_id))
        .map(({ _id, title }) => [_id, title]),
    [data, bookIds]
  );
  const addBook = (values, setFieldValue) => {
    const newBook = data.find(({ _id }) => _id === values.book);
    chooseBook([...chosenBooks, newBook]);
    setFieldValue("book", "");
  };

  const onSubmit = async ({ start, end }) => {
    if (!chosenBooks.length) {
      toast.error("Додайте хоч одну книгу");
      return;
    }
    const training = { start, end, books: bookIds };
    try {
      addTraining(training);
      setRefetch(true);
    } catch (error) {
      toast.error("Не можу додати тренування, спробуйте ще раз");
    }
  };
  const onStartChange = (value) => setDates({ ...dates, start: value });
  const onEndChange = (value) => setDates({ ...dates, end: value });

  if (isFetching) return <div>Loading</div>;
  if (isSuccess)
    return (
      <div className={className}>
        <Title text="Моє тренування" className={s.title} />
        <Formik
          initialValues={{
            start: dates?.start ?? "",
            end: dates?.end ?? "",
            book: "",
          }}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className={s.form}>
              <div className={s.wrapper}>
                <DatePickerField
                  name="start"
                  className={s.date}
                  minDate={new Date()}
                  onChangeCb={onStartChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Початок"
                  autocomplete="off"
                  required
                />
                <svg className={s.icon} width="17" height="17">
                  <use href={`${sprite}#icon-calendar`}></use>
                </svg>
                <svg className={s.polygon} width="13" height="7">
                  <use href={`${sprite}#icon-polygon`}></use>
                </svg>
              </div>
              <div className={s.wrapper}>
                <DatePickerField
                  name="end"
                  className={s.date}
                  minDate={values.start}
                  onChangeCb={onEndChange}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Завершення"
                  autocomplete="off"
                  required
                />
                <svg className={s.icon} width="17" height="17">
                  <use href={`${sprite}#icon-calendar`}></use>
                </svg>
                <svg className={s.polygon} width="13" height="7">
                  <use href={`${sprite}#icon-polygon`}></use>
                </svg>
              </div>
              <div className={s.relative}>
                <Select
                  options={allBooks}
                  name="book"
                  containerClassName={s.select}
                  placeholder="Обрати книгу з бібліотеки"
                />
                <svg className={s.polygon} width="13" height="7">
                  <use href={`${sprite}#icon-polygon`}></use>
                </svg>
              </div>
              <Button
                text="Додати"
                className={s.bookButton}
                onClick={() => addBook(values, setFieldValue)}
              />
              {!!chosenBooks.length && !isMobile && (
                <Button
                  type="submit"
                  text="Почати тренування"
                  className={s.button}
                />
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
};
AddTraining.propTypes = {
  chosenBooks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.number,
      pages: PropTypes.number,
      status: PropTypes.string,
    })
  ),
  chooseBook: PropTypes.func,
  dates: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
  }),
  setDates: PropTypes.func,
  setRefetch: PropTypes.func,
  className: PropTypes.string,
};

export default AddTraining;
