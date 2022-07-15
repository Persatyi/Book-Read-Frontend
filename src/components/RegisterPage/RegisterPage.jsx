import s from "./RegisterPage.module.scss";
import AuthForm from "components/AuthForm";
import Info from "components/Info";

const RegisterPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.formWrapper}>
        <AuthForm type="registration" />
      </div>
      <div className={s.textWrapper}>
        <Info />
      </div>
    </div>
  );
};

export default RegisterPage;
