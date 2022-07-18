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

import s from "./AddTraining.module.scss";

const AddTraining = ({ chosenBooks, chooseBook, dates, setDates }) => {
  const { data, isSuccess, isFetching } = useBooksQuery();
  const [addTraining] = useAddTrainingMutation();
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const allBooks = data?.map(({ _id, title }) => [_id, title]);
  const addBook = (values) => {
    const newBook = data.find(({ _id }) => _id === values.book);
    chooseBook([...chosenBooks, newBook]);
  };
  const onSubmit = ({ start, end }) => {
    if (!chosenBooks.length) {
      toast.error("Додайте хоч одну книгу");
      return;
    }
    const bookIds = chosenBooks.map(({ _id }) => _id);
    const training = { start, end, books: bookIds };
    addTraining(training);
  };
  const onStartChange = (value) => setDates({ ...dates, start: value });
  const onEndChange = (value) => setDates({ ...dates, end: value });

  if (isFetching) return <div>Loading</div>;
  if (isSuccess)
    return (
      <>
        <Title text="Моє тренування" className={s.title} />
        <Formik
          initialValues={{
            start: dates?.start ?? "",
            end: dates?.end ?? "",
            book: "",
          }}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className={s.form}>
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
              <Select
                options={allBooks}
                name="book"
                containerClassName={s.select}
                placeholder="Обрати книгу з бібліотеки"
              />
              <Button
                text="Додати"
                className={s.bookButton}
                onClick={() => addBook(values)}
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
      </>
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
    start: PropTypes.object.isRequired,
    end: PropTypes.object.isRequired,
  }),
  setDates: PropTypes.func,
};

export default AddTraining;
