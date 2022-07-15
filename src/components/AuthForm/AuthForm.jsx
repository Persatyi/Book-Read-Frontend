import { Formik } from "formik";

import s from "./AuthForm.module.scss";
import { useRegisterMutation, useLoginMutation } from "redux/api/bookAPI.js";

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
        dirty,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <label htmlFor="name">
                  Name <span>*</span>
                </label>
                <input
                  className={s.input}
                  id="name"
                  type="name"
                  name="name"
                  placeholder="..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoComplete="name"
                />
              </div>
              {touched.name && errors.name && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.name}</p>
                </div>
              )}
            </>
          ) : null}
          <div className={s.inputWrapper}>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              className={s.input}
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoComplete="email"
            />
          </div>
          {touched.email && errors.email && (
            <div className={s.errorWrapper}>
              <p className={s.error}>{errors.email}</p>
            </div>
          )}
          <div className={s.inputWrapper}>
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              className={s.input}
              type="password"
              name="password"
              id="password"
              placeholder="..."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="off"
            />
          </div>
          {touched.password && errors.password && (
            <div className={s.errorWrapper}>
              <p className={s.error}>{errors.password}</p>
            </div>
          )}
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <label htmlFor="confirmPassword">
                  Confirm Password <span>*</span>
                </label>
                <input
                  className={s.input}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  autoComplete="off"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.confirmPassword}</p>
                </div>
              )}
            </>
          ) : null}

          <button
            className={s.enterBtn}
            type="submit"
            disabled={!isValid && !dirty}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default AuthForm;
