import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import Overlay from "components/Overlay";
import s from "./ModalWrapper.module.scss";

const ModalWrapper = ({ size = "small", open, onClose, children }) => {
  const modalRef = useRef(document.getElementById("modal-root"));

  useEffect(() => {
    window.addEventListener("keydown", onEscPress);
    return () => window.removeEventListener("keydown", onEscPress);
  }, []);

  const onEscPress = (e) => {
    if (e.code === "Escape") onClose();
  };

  return (
    open &&
    createPortal(
      <Overlay onClick={onClose}>
        <div className={`${s.modal} ${size === "large" && s.large}`}>
          {children}
        </div>
      </Overlay>,
      modalRef.current
    )
  );
};

ModalWrapper.propTypes = {
  size: PropTypes.oneOf(["small", "large"]),
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalWrapper;
