import PropTypes from "prop-types";

import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";

import useTranslation from "hooks/useTranslation";
import s from "./ModalLogout.module.scss";

const ModalLogout = ({ open, onClose, logoutFunc }) => {
  const { t } = useTranslation("ModalLogout");

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className={s.modal}>
        <p className={s.text}>{t.text}</p>
        <div className={s.btnBox}>
          <Button
            className={s.button}
            type={"button"}
            styleType="transparent"
            text={t.cancel}
            onClick={onClose}
          />
          <Button
            className={s.button}
            type={"button"}
            text={t.exit}
            onClick={() => logoutFunc()}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

ModalLogout.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  logoutFunc: PropTypes.func.isRequired,
};

export default ModalLogout;
