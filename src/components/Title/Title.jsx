import PropTypes from "prop-types";
import s from "./Title.module.scss";

function Title({ text, className = "" }) {
  return <p className={`${s.title} ${className}`}>{text}</p>;
}
Title.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Title;
