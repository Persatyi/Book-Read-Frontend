import s from "./AuthPage.module.scss";
import AuthForm from "components/AuthForm";
import PropTypes from "prop-types";

import { useWindowSize } from "hooks/useWindowSize";
import { authType } from "assets/schemas/authFormValidation";

const AuthPage = ({ type, children }) => {
  const size = useWindowSize();

  const adjustClassName = () => {
    const classNames = [s.formWrapper];
    if (
      type === authType.registration &&
      size.width < 768 &&
      size.height > 592
    ) {
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

    // <div className={s.wrapperMain}>
    //   <Container>
    //     <div className={s.wrapperS}>
    //       <div className={s.formWrapperS}>
    //         <div className={s.bcg}>
    //           <AuthForm type={type} />
    //         </div>
    //       </div>

    //       {type === authType.registration && size.width < 768 ? null : (
    //         <div className={s.textWrapperS}>{children}</div>
    //       )}
    //     </div>
    //   </Container>
    // </div>
  );
};

AuthPage.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthPage;
