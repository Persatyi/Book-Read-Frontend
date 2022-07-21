import * as yup from "yup";

export const schema = yup.object().shape({
  date: yup.date(),
  pages: yup.number().min(1, "Can't be empty").required(),
});
