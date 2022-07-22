import * as yup from "yup";

const registerFormValidation = (t) =>
  yup.object().shape({
    name: yup
      .string()
      .min(2, t.name.min)
      .max(30, t.name.max)
      .required(t.required),
    email: yup
      .string()
      .email(t.email.correct)
      .min(10, t.email.min)
      .max(63, t.email.max)
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        t.email.correct
      )
      .required(t.required),
    password: yup
      .string()
      .min(6, t.password.min)
      .max(16, t.password.max)
      .matches(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}/,
        t.password.matches
      )
      .required(t.required),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t.confirmPassword.oneOf)
      .required(t.required),
  });

const loginFormValidation = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t.email.correct)
      .min(10, t.email.min)
      .max(63, t.email.max)
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        t.email.correct
      )
      .required(t.required),
    password: yup
      .string()
      .min(6, t.password.min)
      .max(16, t.password.max)
      .matches(
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}/,
        t.password.matches
      )
      .required(t.required),
  });

export function validationSchema(type) {
  if (type === "registration") {
    return registerFormValidation;
  } else {
    return loginFormValidation;
  }
}

export const authType = {
  login: "login",
  registration: "registration",
};
