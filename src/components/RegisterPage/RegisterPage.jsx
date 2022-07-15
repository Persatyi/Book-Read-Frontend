import s from "./RegisterPage.module.scss";
import AuthForm from "components/AuthForm";

const RegisterPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <AuthForm type="registration" />
      </div>
    </div>
  );
};

export default RegisterPage;
