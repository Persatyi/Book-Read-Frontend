import { Formik } from "formik";

import s from "./AuthForm.module.scss";
import { useRegisterMutation, useLoginMutation } from "redux/bookAPI.js";

export const authType = {
  login: "login",
  registration: "registration",
};

const AuthForm = ({ type }) => {
  const isRegister = type === authType.registration;
  const initialValues = isRegister
    ? {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    : {
        email: "",
        password: "",
      };

  return (
    <Formik initialValues={initialValues} validateOnBlur>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => <form onSubmit={handleSubmit}></form>}
    </Formik>
  );
};

export default AuthForm;
