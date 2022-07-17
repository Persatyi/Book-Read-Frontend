import { Formik, Form } from "formik";

import Title from "components/Title";
import DatePickerField from "components/DatePickerField";
import Select from "components/Select";
import Button from "components/Button";

import s from "./AddTraining.module.scss";

const AddTraining = () => {
  const onSubmit = () => {};
  const books = [];
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
            />
            <DatePickerField
              name="end"
              className={s.date}
              minDate={values.start}
              dateFormat="dd.MM.yyyy"
              placeholderText="Завершення"
              autocomplete="off"
            />
            <Select
              options={books}
              name="book"
              containerClassName={s.select}
              placeholder="Обрати книгу з бібліотеки"
            />
            <Button type="submit" text="Додати" className={s.button} />
          </Form>
        )}
      </Formik>
    </>
  );
};
export default AddTraining;
