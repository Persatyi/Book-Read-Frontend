import PropTypes from "prop-types";

import sprite from "assets/images/sprite.svg";
import s from "./Rating.module.scss";

const HIGHEST_MARK = 5;
const STARS = {
  HOLLOW: "hollow-star",
  SOLID: "solid-star",
};

const Rating = ({ mark, onChange }) => {
  let solidArrayLength = mark < HIGHEST_MARK ? mark : HIGHEST_MARK;
  solidArrayLength = mark > 0 ? mark : 0;

  const solid = Array(solidArrayLength).fill(STARS.SOLID);
  const hollow = Array(HIGHEST_MARK - solidArrayLength).fill(STARS.HOLLOW);
  const stars = [...solid, ...hollow];

  return (
    <div role="radiogroup">
      {stars.map((star, idx) => (
        <button
          key={idx}
          type="button"
          role="radio"
          aria-checked={star === STARS.SOLID}
          onClick={onChange ? () => onChange(idx + 1) : null}
          className={onChange ? s.btn : s.noClick}
        >
          <svg className={`${s.star} ${mark ? s.active : s.inactive}`}>
            <use href={`${sprite}#${star}`} />
          </svg>
        </button>
      ))}
    </div>
  );
};

Rating.propTypes = {
  mark: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

export default Rating;
