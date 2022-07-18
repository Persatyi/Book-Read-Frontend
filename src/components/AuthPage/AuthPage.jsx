import s from "./AuthPage.module.scss";
import AuthForm from "components/AuthForm";
import PropTypes from "prop-types";

import { useWindowSize } from "hooks";
import { authType } from "assets/schemas/authFormValidation";

const AuthPage = ({ type, children }) => {
  const size = useWindowSize();

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
      {type === authType.registration && size.width < 768 ? null : (
        <div className={s.textWrapper}>
          <div className={s.container}>{children}</div>
        </div>
      )}
    </div>
  );
};

AuthPage.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthPage;
