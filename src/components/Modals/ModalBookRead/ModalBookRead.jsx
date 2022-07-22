import PropTypes from "prop-types";

import ModalWrapper from "components/ModalWrapper";
import Button from "components/Button";

import useTranslation from "hooks/useTranslation";
import sprite from "assets/images/sprite.svg";
import s from "./ModalBookRead.module.scss";

const ModalBookRead = ({ open, onClose }) => {
  const { t } = useTranslation("ModalBookRead");

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className={s.wrapper}>
        <svg>
          <use href={`${sprite}#thumb-up`} />
        </svg>
        <p>
          {t.grats}
          <br />
          {t.another}
        </p>
        <Button text={t.button} onClick={onClose} />
      </div>
    </ModalWrapper>
  );
};

ModalBookRead.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalBookRead;
