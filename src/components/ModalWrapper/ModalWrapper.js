import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Overlay from "components/Overlay";
import s from "./Modal.module.css";

const ModalWrapper = ({ children, onClose }) => {
  const modalRef = useRef(document.querySelector("#modal"));

  useEffect(() => {
    window.addEventListener("keydown", onEscPress);
    return () => window.removeEventListener("keydown", onEscPress);
  }, []);

  const onEscPress = (e) => {
    if (e.code === "Escape") onClose();
  };

  return createPortal(
    <Overlay onOverlayClick={onClose}>
      <div className={s.modal}>{children}</div>
    </Overlay>,
    modalRef.current
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalWrapper;
