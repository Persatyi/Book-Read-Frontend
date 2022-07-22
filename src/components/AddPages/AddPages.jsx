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
import { useState } from "react";

const AddPages = ({ data = {}, className, updateResults, setUpdate }) => {
  const { data: sets, start, added: addedPages, end, total: totalPages } = data;

  const parsedStart = Date.parse(start);
  const parsedEnd = Date.parse(end);
  const trainingDays = dayjs(parsedEnd).diff(parsedStart, "hour", true) / 24;

  function getDates() {
    const dateArray = [dayjs(parsedStart).format("DD.MM.YYYY")];
    for (let i = 1; i <= trainingDays; i += 1) {
      const currentDate = dayjs(parsedStart).add(i, "day").format("DD.MM.YYYY");
      dateArray.push(currentDate);
    }
    return dateArray; // Отримуєм масив дат
  }

  const [openModal, setOpenModal] = useState(false);
  const checkRefreshToken = useRefreshToken();

  const isLessThenAverage = (range) => {
    const averageAmount = Math.ceil(totalPages / range);
    let averagePerDay = 0;
    for (let i = 0; i < range; i += 1) {
      averagePerDay = averageAmount * (i + 1);
      if (getDates()[i] === dayjs().format("DD.MM.YYYY")) {
        if (addedPages < averagePerDay) {
          setOpenModal(true);
        }
      }
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const onSubmit = async (values) => {
    try {
      await checkRefreshToken();
      await updateResults(values);
      setUpdate();
      isLessThenAverage(getDates().length);
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <>
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
      </Formik>
      <ModalTrainingDone
        open={openModal}
        onNew={() => {}}
        onClose={closeModal}
      />
    </>
  );
};

export default AddPages;
