import s from "./AddPages.module.scss";
import { Formik } from "formik";
import DatePickerField from "components/DatePickerField";

const AddPages = () => {
  return (
    <Formik className={s.form}>
      <h2>Results</h2>
      <div className={s.wrapper}>
        <div>
          <p>Date</p>
          <DatePickerField />
        </div>
        <div className={s.amountWrapper}>
          <p>Amount of pages</p>
          <input className={s.input} type="number" />
        </div>
      </div>
    </Formik>
  );
};
export default AddPages;
