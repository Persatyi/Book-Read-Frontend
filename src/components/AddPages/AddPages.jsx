import s from "./AddPages.module.scss";
import spriteSvg from "assets/images/sprite.svg";
import { schema } from "assets/schemas/addPagesValidation";
import Button from "components/Button";
import { ModalBookRead, ModalTrainingDone } from "components/Modals";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePickerField from "components/DatePickerField";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import useRefreshToken from "hooks/useRefreshToken";
import useTranslation from "hooks/useTranslation";
import { useState } from "react";
import PropTypes from "prop-types";

const AddPages = ({
  data = {},
  className,
  updateResults,
  setUpdate,
  setRefetch,
  resetState,
}) => {
  const { data: sets, start } = data;
  const parsedStart = Date.parse(start);
  const navigate = useNavigate();

  const [bookReadModal, setBookReadModal] = useState(false);
  const [modalTrainingDone, setModalTrainingDone] = useState(false);

  const closeModalTrainingDone = async () => {
    setModalTrainingDone(false);
    setRefetch();
    setUpdate();
    resetState();
  };

  const closeReadModal = () => {
    setBookReadModal(false);
    setRefetch();
    setUpdate();
  };

  const checkRefreshToken = useRefreshToken();
  const { t, language, dateFormat } = useTranslation("AddPages");

  const onSubmit = async (values) => {
    try {
      await checkRefreshToken();
      const result = await updateResults(values).unwrap();
      setUpdate();
      setModalTrainingDone(result.finish);
      if (!result.finish) {
        setBookReadModal(result.isBookRead);
      }
    } catch (error) {
      toast.error(t.error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ date: new Date(), pages: "" }}
        onSubmit={onSubmit}
        validationSchema={schema(t)}
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
                  dateFormat={dateFormat.datepicker}
                  closeOnScroll={true}
                  value={values.date}
                  locale={language}
                />
                <svg className={s.iconSvg} style={{ width: "24px" }}>
                  <use href={`${spriteSvg}#icon-polygon`}></use>
                </svg>
              </div>
              <div className={s.fieldWrapper}>
                <p className={s.name}>{t.pages}</p>
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
              text={t.button}
            />
            <h2 className={s.statisticsTitle}>STATISTICS</h2>
            {!!sets && (
              <ul className={s.statistics}>
                {sets
                  .slice(0)
                  .reverse()
                  .map(({ _id: id, pages, date }) => (
                    <li className={s.item} key={id} id={id}>
                      <span className={s.day}>
                        {dayjs(date).format(dateFormat.dayjs)}
                      </span>
                      <span className={s.data}>
                        {dayjs(date).format("HH:mm:ss")}
                      </span>
                      <span className={s.pages}>
                        {pages} {t.pagesShort}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </Form>
        )}
      </Formik>
      <ModalTrainingDone
        open={modalTrainingDone}
        onClose={() => navigate("/library")}
        onNew={closeModalTrainingDone}
      />
      <ModalBookRead open={bookReadModal} onClose={closeReadModal} />
    </>
  );
};

AddPages.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    start: PropTypes.string,
  }),
  updateResults: PropTypes.func,
  setUpdate: PropTypes.func,
  resetState: PropTypes.func,
  setRefetch: PropTypes.func,
  className: PropTypes.string,
};

export default AddPages;
