import * as yup from "yup";

const reviewFormValidation = (t) =>
  yup.object().shape({
    rating: yup.number().min(0).max(5).required(t.required),
    resume: yup.string().max(200),
  });

export default reviewFormValidation;
