import PropTypes from "prop-types";

import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";

import useTranslation from "hooks/useTranslation";
import sprite from "assets/images/sprite.svg";
import s from "./ModalTrainingDone.module.scss";

const ModalTrainingDone = ({ open, onClose, onNew }) => {
  const { t } = useTranslation("ModalTrainingDone");

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className={s.wrapper}>
        <svg>
          <use href={`${sprite}#thumb-up`} />
        </svg>
        <p>
          {t.well}
          <br />
          {t.faster}
          <br />
          {t.can}
        </p>
        <div className={s.btnGroup}>
          <Button text={t.training} onClick={onNew} />
          <Button styleType={"transparent"} text={t.back} onClick={onClose} />
        </div>
      </div>
    </ModalWrapper>
  );
};

ModalTrainingDone.propTypes = {
  open: PropTypes.bool.isRequired,
  onNew: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalTrainingDone;
