import s from "./AuthPage.module.scss";
import AuthForm from "components/AuthForm";
import Info from "components/Info";
import Quote from "components/Quote";
import { useWindowSize } from "hooks/useWindowSize";
import { authType } from "assets/schemas/authFormValidation";

const AuthPage = ({ type }) => {
  const size = useWindowSize();

  const showInfo = () => {
    return size.width >= 768 ? <Info /> : null;
  };

  const adjustClassName = () => {
    const classNames = [s.formWrapper];
    if (type === authType.registration && size.width < 768) {
      classNames.push(s.registrationMobile);
    }
    return classNames.join(" ");
  };

  return (
    <div className={s.wrapper}>
      <div className={adjustClassName()}>
        <div className={s.container}>
          <AuthForm type={type} />
        </div>
      </div>
      <div className={s.textWrapper}>
        <div className={s.container}>
          {type === authType.registration ? showInfo() : <Quote />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
