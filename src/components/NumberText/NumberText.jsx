import PropTypes from "prop-types";
import s from "./NumberText.module.scss";

function NumberText({ number, text }) {
  return (
    <div className={s.wrapper}>
      <span className={s.number}>{number}</span>
      <span className={s.text}>{text}</span>
    </div>
  );
}
NumberText.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default NumberText;
