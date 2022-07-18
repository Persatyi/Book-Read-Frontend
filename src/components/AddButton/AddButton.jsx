import PropTypes from "prop-types";

import sprite from "assets/images/sprite.svg";

import s from "./AddButton.module.scss";

const AddButton = ({ onClick, label, className = "" }) => {
  return (
    <button
      className={`${s.button} ${className}`}
      type="button"
      onClick={onClick}
      aria-label={label}
    >
      <svg className={s.icon} width="16" height="16">
        <use href={`${sprite}#icon-plus`}></use>
      </svg>
    </button>
  );
};
AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AddButton;
