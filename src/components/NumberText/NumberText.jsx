import PropTypes from "prop-types";
import s from "./NumberText.module.scss";

function NumberText({
  number = 0,
  text,
  isActiveTraining,
  numberClassName = "",
}) {
  return (
    <div className={isActiveTraining ? s.activeWrapper : s.wrapper}>
      <span
        className={
          isActiveTraining ? `${s.activeNumber} ${numberClassName}` : s.number
        }
      >
        {number}
      </span>
      <span className={isActiveTraining ? s.activeText : s.text}>{text}</span>
    </div>
  );
}
NumberText.propTypes = {
  number: PropTypes.number,
  text: PropTypes.string.isRequired,
  numberClassName: PropTypes.string,
};

export default NumberText;
