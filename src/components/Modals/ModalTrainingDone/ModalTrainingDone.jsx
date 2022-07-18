import React from "react";
import PropTypes from "prop-types";
import s from "./ModalTrainingDone.module.scss";
import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";
import sprite from "assets/images/sprite.svg";

const ModalTrainingDone = ({ open, onClose, onNew }) => (
  <ModalWrapper open={open} onClose={onClose}>
    <div className={s.wrapper}>
      <svg>
        <use href={`${sprite}#thumb-up`} />
      </svg>
      <p>
        Well done!
        <br />
        But you need to be a little bit faster.
        <br />
        You can do it)
      </p>
      <div className={s.btnGroup}>
        <Button text={"New training"} onClick={onNew} />
        <Button styleType={"transparent"} text={"Back"} onClick={onClose} />
      </div>
    </div>
  </ModalWrapper>
);

ModalTrainingDone.propTypes = {
  open: PropTypes.bool.isRequired,
  onNew: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalTrainingDone;
