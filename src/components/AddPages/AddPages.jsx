import s from "./AddPages.module.scss";
import spriteSvg from "assets/images/sprite.svg";
import Button from "components/Button";
import { useAddPageMutation, useGetResultsQuery } from "redux/api/bookAPI";

// import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePickerField from "components/DatePickerField";
import * as yup from "yup";
import dayjs from "dayjs";

const schema = yup.object().shape({
  date: yup.date(),
  pages: yup.number().min(1, "Can't be empty").required(),
});

const AddPages = () => {
  const [addPage] = useAddPageMutation();
  const { data } = useGetResultsQuery();

  const onSubmit = (values) => {
    addPage(values);
  };

  return (
    <Formik
      initialValues={{ date: new Date(), pages: "" }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ values, handleSubmit, handleChange, isValid, dirty }) => (
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
          <Button
            disabled={!isValid && !dirty}
            type="submit"
            className={s.button}
            text="Add result"
          />
          <h2 className={s.statisticsTitle}>STATISTICS</h2>
          {data && (
            <ul className={s.statistics}>
              {data
                .slice(0)
                .reverse()
                .map(({ _id: id, pages, date }) => (
                  <li className={s.item} key={id}>
                    <span className={s.day}>
                      {dayjs(date).format("DD.MM.YYYY")}
                    </span>
                    <span className={s.data}>
                      {dayjs(date).format("HH:mm:ss")}
                    </span>
                    <span className={s.pages}>{pages} pages</span>
                  </li>
                ))}
            </ul>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddPages;
