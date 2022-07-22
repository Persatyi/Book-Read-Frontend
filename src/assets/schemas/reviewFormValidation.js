import * as yup from "yup";

const reviewFormValidation = (t) =>
  yup.object().shape({
    rating: yup.number().min(1).max(5).required(t.required),
    resume: yup.string().max(200).required(t.required),
  });

export default reviewFormValidation;
