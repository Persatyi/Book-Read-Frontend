import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import s from "./AddBook.module.scss";
import { useAddBookMutation } from "redux/api/bookAPI";
import addBookSchema from "assets/schemas/addBookSchema";
import useRefreshToken from "hooks/useRefreshToken";
import useTranslation from "hooks/useTranslation";
import Button from "components/Button";

export default function AddBook() {
  const [addBook] = useAddBookMutation();
  const checkRefreshToken = useRefreshToken();
  const { t: translation } = useTranslation();
  const t = translation["AddBook"];
  return (
    <Formik
      initialValues={{
        title: "",
        author: "",
        year: "",
        pages: "",
      }}
      validationSchema={addBookSchema(translation["AddBookSchema"])}
      validateOnBlur
      onSubmit={async (values, actions) => {
        await checkRefreshToken();
        await addBook(values);
        toast.success(t.success);
        actions.resetForm();
      }}
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
          <Button
            type="submit"
            disabled={!isValid}
            className={s.form__button}
            text={t.add}
            styleType="secondary"
          />
        </Form>
      )}
    </Formik>
  );
}
