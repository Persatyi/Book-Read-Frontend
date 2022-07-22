import * as Yup from "yup";

const addBookSchema = (t) =>
  Yup.object().shape({
    title: Yup.string()
      .min(3, t.title.min)
      .max(100, t.title.max)
      .required(t.required),
    author: Yup.string()
      .min(3, t.author.min)
      .max(100, t.author.max)
      .required(t.required),
    year: Yup.number()
      .min(1500, t.year.min)
      .max(2022, t.year.max)
      .required(t.required),
    pages: Yup.number()
      .min(2, t.pages.min)
      .max(4999, t.pages.max)
      .required(t.required),
  });

export default addBookSchema;
