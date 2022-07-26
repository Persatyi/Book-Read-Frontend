import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { useAddBookMutation, useEditBookMutation } from "redux/api/bookAPI";

import addBookSchema from "assets/schemas/addBookSchema";
import useRefreshToken from "hooks/useRefreshToken";
import useTranslation from "hooks/useTranslation";
import s from "./AddBook.module.scss";

export default function AddBook({ book }) {
  const [addBook] = useAddBookMutation();
  const [editBook] = useEditBookMutation();
  const checkRefreshToken = useRefreshToken();
  const { t: translation } = useTranslation();
  const t = translation["AddBook"];

  const initialValues = {
    title: book ? book.title : "",
    author: book ? book.author : "",
    year: book ? book.year : "",
    pages: book ? book.pages : "",
  };

  const onSubmit = async (values, actions) => {
    const mutation = book ? editBook : addBook;
    const successMessage = book ? t.editSuccess : t.success;
    const data = book ? { ...values, id: book._id } : values;

    await checkRefreshToken();
    await mutation(data);
    toast.success(successMessage);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addBookSchema(translation["AddBookSchema"])}
      validateOnBlur
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form className={s.form}>
          <label htmlFor="title" className={s.form__label}>
            {t.title}
            <Field
              id="title"
              autoComplete="off"
              type="text"
              name="title"
              className={`${s.form__input} ${s.form__input_title}`}
              placeholder="..."
            />
            <ErrorMessage
              name="title"
              component="span"
              className={`${s.form__error} ${s.form__error_title}`}
            />
          </label>
          <label htmlFor="author" className={s.form__label}>
            {t.author}
            <Field
              id="author"
              autoComplete="off"
              type="text"
              name="author"
              className={`${s.form__input} ${s.form__input_author}`}
              placeholder="..."
            />
            <ErrorMessage
              name="author"
              component="span"
              className={s.form__error}
            />
          </label>
          <label htmlFor="year" className={s.form__label}>
            {t.date}
            <Field
              id="year"
              autoComplete="off"
              type="number"
              name="year"
              className={`${s.form__input} ${s.form__input_year}`}
              placeholder="..."
            />
            <ErrorMessage
              name="year"
              component="span"
              className={s.form__error}
            />
          </label>
          <label htmlFor="pages" className={s.form__label}>
            {t.pages}
            <Field
              id="pages"
              autoComplete="off"
              type="number"
              name="pages"
              className={`${s.form__input} ${s.form__input_pages}`}
              placeholder="..."
            />
            <ErrorMessage
              name="pages"
              component="span"
              className={s.form__error}
            />
          </label>
          <button type="submit" disabled={!isValid} className={s.form__button}>
            {book ? t.edit : t.add}
          </button>
        </Form>
      )}
    </Formik>
  );
}
AddBook.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
    status: PropTypes.string,
  }),
};
