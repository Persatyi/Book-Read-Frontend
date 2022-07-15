import * as yup from "yup";
import { authType } from "components/AuthForm";

const registerFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(2, "Please enter more than 1 character")
    .max(30, "Please enter not more than 30 character")
    .required("this field is required"),
  email: yup
    .string()
    .email("Please enter correct email")
    .min(10, "Please enter more than 9 character")
    .max(63, "Max 63")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter correct email"
    )
    .required("this field is required"),
  password: yup
    .string()
    .min(6, "Please enter more than 5 character")
    .max(16, "Please enter not more than 16 character")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}/,
      "Password must contain one number,uppercase and lowercase character"
    )
    .required("this field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("this field is required"),
});

const loginFormValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter correct email")
    .min(10, "Please enter more than 9 character")
    .max(63, "Max 63")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter correct email"
    )
    .required("this field is required"),
  password: yup
    .string()
    .min(6, "Please enter more than 5 character")
    .max(16, "Please enter not more than 16 character")
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}/,
      "Password must contain one number,uppercase and lowercase character"
    )
    .required("this field is required"),
});

export function validationSchema(type) {
  if (type === "registration") {
    return registerFormValidation;
  } else {
    return loginFormValidation;
  }
}
