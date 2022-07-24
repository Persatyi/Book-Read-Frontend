import React from "react";
import PropTypes from "prop-types";
import { useAddReviewMutation } from "redux/api/bookAPI";
import { reviewFormValidation } from "assets/schemas";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Rating from "components/Rating";
import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";
import s from "./ModalBookReview.module.scss";
import useTranslation from "hooks/useTranslation";

const ModalBookReview = (props) => {
  const book = props.book;
  const init = { rating: 0, resume: book?.resume || "" };
  const [addReview] = useAddReviewMutation();
  const { t } = useTranslation("ModalBookReview");

  const handleSubmit = async (payload) => {
    try {
      const id = book._id;
      await addReview({ id, ...payload });
    } catch (error) {
      switch (error.status) {
        case 400:
          toast.error(t[400]);
          break;
        default:
          toast.error(t.default);
          break;
      }
    }
  };
  return (
    <ModalWrapper size={"large"} open={props.open} onClose={props.onClose}>
      <Formik
        initialValues={init}
        validationSchema={reviewFormValidation(t)}
        validateOnBlur
        onSubmit={handleSubmit}
      >
        {({ values, dirty, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.field}>
              <label className={s.label} htmlFor={"rating"}>
                {t.rating}
              </label>
              <Rating
                mark={values.rating || book.rating}
                onChange={(value) => {
                  setFieldValue("rating", value);
                }}
                id={"rating"}
              />
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor={"resume"}>
                {t.resume}
              </label>
              <textarea
                placeholder="..."
                id={"resume"}
                name={"resume"}
                value={values.resume}
                onChange={handleChange}
                className={s.resume}
              />
            </div>
            <div className={s.btnGroup}>
              <Button
                styleType={"transparent"}
                text={t.back}
                onClick={props.onClose}
              />
              <Button
                type={"submit"}
                disabled={!dirty}
                text={t.save}
                onClick={props.onClick}
              />
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

ModalBookReview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ModalBookReview;
