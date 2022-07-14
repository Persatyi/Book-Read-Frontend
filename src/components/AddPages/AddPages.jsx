import s from "./AddPages.module.scss";
import spriteSvg from "assets/images/sprite.svg";
import Button from "components/Button";

import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePickerField from "components/DatePickerField";
import * as yup from "yup";

const schema = yup.object().shape({
  date: yup.date(),
  pages: yup.number().min(1, "Can't be empty").required(),
});

const AddPages = () => {
  const onSubmit = (values) => {
    console.log("🚀 ~ values", values);
    // const { date, pages } = values;
  };
  return (
    <Formik
      initialValues={{ date: new Date(), pages: "" }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ values, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit} className={s.form}>
          <h2 className={s.title}>Results</h2>
          <div className={s.wrapper}>
            <div className={s.fieldWrapper}>
              <p className={s.name}>Date</p>
              <DatePickerField
                className={s.date}
                name="date"
                maxDate={new Date()}
                dateFormat="MM.dd.yyyy"
                closeOnScroll={true}
                value={values.date}
                onChange={handleChange}
              />
              <svg className={s.iconSvg} style={{ width: "24px" }}>
                <use href={`${spriteSvg}#icon-polygon`}></use>
              </svg>
            </div>
            <div className={s.fieldWrapper}>
              <p className={s.name}>Amount of pages</p>
              <Field className={s.input} type="number" name="pages" />
              <span className={s.error}>
                <ErrorMessage name="pages" />
              </span>
            </div>
          </div>
          <Button className={s.button} text="Add result" />
        </Form>
      )}
    </Formik>
  );
};

export default AddPages;
