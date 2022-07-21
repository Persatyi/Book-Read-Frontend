import * as yup from "yup";

const reviewFormValidation = yup.object().shape({
  rating: yup.number().min(1).max(5).required("This field is required"),
  resume: yup.string().max(200).required("This field is required"),
});

export default reviewFormValidation;
