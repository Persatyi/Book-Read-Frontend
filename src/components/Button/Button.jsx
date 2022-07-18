import s from "./Button.module.scss";
import PropTypes from "prop-types";

const Button = ({
  className = "",
  type = "button",
  styleType = "main",
  text,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`${className} ${s[styleType]}`}
      type={type}
      onClick={onClick ? onClick : null}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  styleType: PropTypes.oneOf(["main", "secondary", "transparent"]),
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
};

export default Button;
