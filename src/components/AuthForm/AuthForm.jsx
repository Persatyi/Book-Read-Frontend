import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { toast } from "react-toastify";

import s from "./AuthForm.module.scss";
import { validationSchema, authType } from "assets/schemas/authFormValidation";
import { useRegisterMutation, useLoginMutation } from "redux/api/bookAPI.js";
import { loggedIn } from "redux/auth/sliceAuth";

import Button from "components/Button";
import GoogleBtn from "components/GoogleBtn";

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
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

  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(type)}
      validateOnBlur
      onSubmit={async (values) => {
        try {
          const { name, email, password } = values;
          const data = isRegister
            ? { name, email, password }
            : { email, password };

          const callFunction = isRegister ? registerUser : loginUser;
          const response = await callFunction(data).unwrap();

          dispatch(loggedIn(response.token));
        } catch (error) {
          let message = "";
          switch (error.status) {
            case 409:
              message = "There is an account with this email";
              break;
            case 400:
              message =
                "Something went wrong. Please check your data and try again.";
              break;
            case 401:
              message =
                "Invalid credentials. Please check your data and try again.";
              break;
            default:
              message = "Something went wrong. Please try again.";
          }
          toast.error(message);
        }
      }}
    >
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
        <form onSubmit={handleSubmit} className={s.form}>
          <GoogleBtn />
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <label className={s.label} htmlFor="name">
                  Name <span className={s.required}>*</span>
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
                {touched.name && errors.name && (
                  <div className={s.errorWrapper}>
                    <p className={s.error}>{errors.name}</p>
                  </div>
                )}
              </div>
            </>
          ) : null}
          <div className={s.inputWrapper}>
            <label className={s.label} htmlFor="email">
              Email <span className={s.required}>*</span>
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

            {touched.email && errors.email && (
              <div className={s.errorWrapper}>
                <p className={s.error}>{errors.email}</p>
              </div>
            )}
          </div>
          <div className={s.inputWrapper}>
            <label className={s.label} htmlFor="password">
              Password <span className={s.required}>*</span>
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

            {touched.password && errors.password && (
              <div className={s.errorWrapper}>
                <p className={s.error}>{errors.password}</p>
              </div>
            )}
          </div>
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <label className={s.label} htmlFor="confirmPassword">
                  Confirm Password <span className={s.required}>*</span>
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

                {touched.confirmPassword && errors.confirmPassword && (
                  <div className={s.errorWrapper}>
                    <p className={s.error}>{errors.confirmPassword}</p>
                  </div>
                )}
              </div>
            </>
          ) : null}

          <Button
            className={s.authBtn}
            type="submit"
            disabled={!(isValid && dirty)}
            text={isRegister ? "Register" : "Login"}
          />
          <p className={s.navigate}>
            {isRegister && "Already have an account? "}
            {isRegister ? (
              <Link className={s.link} to="/login">
                Log in
              </Link>
            ) : (
              <Link className={s.link} to="/register">
                Register
              </Link>
            )}
          </p>
        </form>
      )}
    </Formik>
  );
};

export default AuthForm;
