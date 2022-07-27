import PropTypes from "prop-types";

import Button from "components/Button";
import ModalWrapper from "components/ModalWrapper";

import useTranslation from "hooks/useTranslation";
import s from "./ModalRemoveBook.module.scss";

const ModalRemoveBook = ({ open, onClose, continueFunc }) => {
  const { t } = useTranslation("ModalRemoveBook");

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
            text={t.continue}
            onClick={() => continueFunc()}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

ModalRemoveBook.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  continueFunc: PropTypes.func.isRequired,
};

export default ModalRemoveBook;
