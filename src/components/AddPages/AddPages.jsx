import s from "./AddPages.module.scss";
import spriteSvg from "assets/images/sprite.svg";
import { schema } from "assets/schemas/addPagesValidation";
import Button from "components/Button";
import { ModalTrainingDone } from "components/Modals";

import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePickerField from "components/DatePickerField";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import useRefreshToken from "hooks/useRefreshToken";

const AddPages = ({ data = {}, className, updateResults, setUpdate }) => {
  const { data: sets, start } = data;
  const parsedStart = Date.parse(start);

  const checkRefreshToken = useRefreshToken();

  const onSubmit = async (values) => {
    try {
      await checkRefreshToken();
      await updateResults(values);
      setUpdate();
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <Formik
      initialValues={{ date: new Date(), pages: "" }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      {({ values, isValid, dirty }) => (
        <Form className={`${s.form} ${className}`}>
          <h2 className={s.title}>Result</h2>
          <div className={s.wrapper}>
            <div className={s.fieldWrapper}>
              <p className={s.name}>Date</p>
              <DatePickerField
                className={s.date}
                name="date"
                minDate={parsedStart}
                maxDate={new Date()}
                dateFormat="MM.dd.yyyy"
                closeOnScroll={true}
                value={values.date}
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
          {!!sets && (
            <ul className={s.statistics}>
              {sets
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
      {<ModalTrainingDone open={false} onNew={() => {}} onClose={() => {}} />}
    </Formik>
  );
};

export default AddPages;
