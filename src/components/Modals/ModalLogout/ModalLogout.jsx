import React, from "react";
import PropTypes from "prop-types";
import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";
import s from "./ModalLogout.module.scss";

const ModalLogout = ({ open, onClose, logoutFunc }) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className={s.modal}>
        <p className={s.text}>
          Якщо Ви вийдете з програми незбережені дані будуть втрачені
        </p>
        <div className={s.btnBox}>
          <Button
            className={s.button}
            type={"button"}
            styleType="transparent"
            text={"Відміна"}
            onClick={onClose}
          />
          <Button
            className={s.button}
            type={"button"}
            text={"Вийти"}
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
