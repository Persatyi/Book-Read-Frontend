import React from "react";
import PropTypes from "prop-types";
import { reviewFormValidation } from "assets/schemas";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Rating from "components/Rating";
import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";
import s from "./ModalBookReview.module.scss";

const saveReview = async (payload) => {
  /* TODO: make PUT query to save review information */
  console.log("save =>", payload);
};

const init = { rating: 0, resume: "" };

const handleSubmit = async (payload) => {
  try {
    await saveReview(payload);
  } catch (error) {
    switch (error.status) {
      case 400:
        toast.error("Please check your data and try again.");
        break;
      default:
        toast.error("Something went wrong. Please try again.");
        break;
    }
  }
};

const ModalBookReview = (props) => (
  <ModalWrapper open={props.open} onClose={props.onClose}>
    <Formik
      initialValues={init}
      validationSchema={reviewFormValidation}
      validateOnBlur
      onSubmit={handleSubmit}
    >
      {({
        values,
        dirty,
        isValid,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.field}>
            <label className={s.label} htmlFor={"rating"}>
              Choose rating of the book
            </label>
            <Rating
              mark={values.rating}
              onChange={(value) => setFieldValue("rating", value)}
              id={"rating"}
            />
          </div>
          <div className={s.field}>
            <label className={s.label} htmlFor={"resume"}>
              Resume
            </label>
            <textarea
              id={"resume"}
              name={"resume"}
              value={values.resume}
              onChange={handleChange}
              className={s.resume}
            />
          </div>
          <div className={s.btnGroup}>
            <Button type={"button"} styleType={"transparent"} text={"Back"} />
            <Button
              type={"submit"}
              disabled={!(isValid && dirty)}
              text={"Save"}
            />
          </div>
        </form>
      )}
    </Formik>
  </ModalWrapper>
);

ModalBookReview.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalBookReview;
