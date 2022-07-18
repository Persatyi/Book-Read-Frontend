import PropTypes from "prop-types";

import sprite from "assets/images/sprite.svg";

import s from "./IconButton.module.scss";

export const TYPES = {
  ADD: "add",
  BACK: "back",
};

const IconButton = ({ onClick, label, className = "", type = TYPES.ADD }) => {
  if (type === TYPES.ADD)
    return (
      <button
        className={`${s.plus} ${className}`}
        type="button"
        onClick={onClick}
        aria-label={label}
      >
        <svg width="16" height="16">
          <use href={`${sprite}#icon-plus`}></use>
        </svg>
      </button>
    );
  if (type === TYPES.BACK)
    return (
      <button
        className={`${s.back} ${className}`}
        type="button"
        onClick={onClick}
        aria-label={label}
      >
        <svg width="24" height="12">
          <use href={`${sprite}#icon-back`}></use>
        </svg>
      </button>
    );
};
IconButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default IconButton;
