import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import sprite from "assets/images/sprite.svg";
import s from "./Rating.module.scss";

const HIGHEST_MARK = 5;

const Rating = (props) => {
  const [stars, setStars] = useState(Array(HIGHEST_MARK).fill("hollow-star"));

  useEffect(() => {
    const solid = Array(props.mark).fill("solid-star");
    const hollow = Array(HIGHEST_MARK - props.mark).fill("hollow-star");
    setStars([...solid, ...hollow]);
  }, [props.mark]);

  return (
    <div role={"radiogroup"}>
      {stars.map((star, idx) => (
        <button
          key={idx}
          type={"button"}
          role={"radio"}
          onClick={() => props.onChange(idx + 1)}
          className={s.btn}
        >
          <svg className={`${s.star} ${props.mark ? s.active : s.inactive}`}>
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
