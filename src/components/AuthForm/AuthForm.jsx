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
import useTranslation from "hooks/useTranslation";

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
  const { t: translation } = useTranslation();
  const t = translation["AuthForm"];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema(type, translation.authFormValidation)}
      validateOnBlur
      onSubmit={async (values) => {
        try {
          const { name, email, password } = values;
          const data = isRegister
            ? { name, email, password }
            : { email, password };

          const callFunction = isRegister ? registerUser : loginUser;
          const response = await callFunction(data).unwrap();

          dispatch(loggedIn(response));
        } catch (error) {
          let message = "";
          switch (error.status) {
            case 409:
              message = t.error[409];
              break;
            case 400:
              message = t.error[400];
              break;
            case 401:
              message = t.error[401];
              break;
            default:
              message = t.error.default;
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
                  {t.name} <span className={s.required}>*</span>
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
              {t.email} <span className={s.required}>*</span>
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
              {t.password} <span className={s.required}>*</span>
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
                  {t.confirm} <span className={s.required}>*</span>
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
            text={isRegister ? t.register : t.login}
          />
          <p className={s.navigate}>
            {isRegister && t.isRegister}{" "}
            {isRegister ? (
              <Link className={s.link} to="/login">
                {t.login}
              </Link>
            ) : (
              <Link className={s.link} to="/register">
                {t.register}
              </Link>
            )}
          </p>
        </form>
      )}
    </Formik>
  );
};

export default AuthForm;
