import * as yup from "yup";

export const schema = (t) =>
  yup.object().shape({
    date: yup.date(),
    pages: yup.number().min(1, t.min).required(t.required),
  });
