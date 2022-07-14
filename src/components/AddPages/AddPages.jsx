import s from "./AddPages.module.scss";
import { Formik, Form } from "formik";
import DatePickerField from "components/DatePickerField";

const AddPages = () => {
  const onSubmit = () => {};
  return (
    <Formik initialValues={{ date: "", pages: "" }} onSubmit={onSubmit}>
      {({ values }) => {
        <Form className={s.form}>
          <h2>Results</h2>
          <div className={s.wrapper}>
            <div>
              <p>Date</p>
              <DatePickerField selected={new Date()} />
            </div>
            <div className={s.amountWrapper}>
              <p>Amount of pages</p>
              <input className={s.input} type="number" />
            </div>
          </div>
        </Form>;
      }}
    </Formik>
  );
};
export default AddPages;
