import React from "react";
import PropTypes from "prop-types";
import { useAddReviewMutation } from "redux/api/bookAPI";
import { reviewFormValidation } from "assets/schemas";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import Rating from "components/Rating";
import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";
import s from "./ModalBookReview.module.scss";
import useTranslation from "hooks/useTranslation";

const ModalBookReview = ({ book, open, onClose }) => {
  const { rating, resume } = book;
  const init = { rating, resume };
  const [addReview] = useAddReviewMutation();
  const { t } = useTranslation("ModalBookReview");

  const handleSubmit = async ({ rating, resume }) => {
    try {
      const id = book._id;
      await addReview({ id, rating, resume: resume.trim() || " " });
      onClose();
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
    <ModalWrapper size={"large"} open={open} onClose={onClose}>
      <Formik
        initialValues={init}
        validationSchema={reviewFormValidation(t)}
        validateOnBlur
        onSubmit={handleSubmit}
      >
        {({ values, dirty, setFieldValue }) => (
          <Form className={s.form}>
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
              <Field
                component="textarea"
                placeholder="..."
                id="resume"
                name="resume"
                className={s.resume}
              />
            </div>
            <div className={s.btnGroup}>
              <Button
                styleType={"transparent"}
                text={t.back}
                onClick={onClose}
              />
              <Button type="submit" disabled={!dirty} text={t.save} />
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

ModalBookReview.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalBookReview;
