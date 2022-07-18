import { Formik, Form } from "formik";
import { toast } from "react-toastify";

import { useAddTrainingMutation, useBooksQuery } from "redux/api/bookAPI";

import Title from "components/Title";
import DatePickerField from "components/DatePickerField";
import Select from "components/Select";
import Button from "components/Button";

import s from "./AddTraining.module.scss";

const AddTraining = ({ chosenBooks, chooseBook }) => {
  const { data, isSuccess, isFetching } = useBooksQuery();
  const [addTraining] = useAddTrainingMutation();
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
  if (isFetching) return <div>Loading</div>;
  if (isSuccess)
    return (
      <>
        <Title text="Моє тренування" className={s.title} />
        <Formik
          initialValues={{
            start: "",
            end: "",
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
                dateFormat="dd.MM.yyyy"
                placeholderText="Початок"
                autocomplete="off"
                required
              />
              <DatePickerField
                name="end"
                className={s.date}
                minDate={values.start}
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
              {!!chosenBooks.length && (
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
export default AddTraining;
