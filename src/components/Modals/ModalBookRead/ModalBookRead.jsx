import React from "react";
import PropTypes from "prop-types";
import sprite from "assets/images/sprite.svg";
import ModalWrapper from "components/ModalWrapper";
import Button from "components/Button";
import s from "./ModalBookRead.module.scss";

const ModalBookRead = ({ open, onClose }) => (
  <ModalWrapper open={open} onClose={onClose}>
    <div className={s.wrapper}>
      <svg>
        <use href={`${sprite}#thumb-up`} />
      </svg>
      <p>
        Congratulations!
        <br />
        Another book read.
      </p>
      <Button text={"Done"} onClick={onClose} />
    </div>
  </ModalWrapper>
);

ModalBookRead.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalBookRead;
