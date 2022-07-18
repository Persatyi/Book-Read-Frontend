import PropTypes from "prop-types";

import sprite from "assets/images/sprite.svg";

import s from "./BookItem.module.scss";

function BookItem({ book = {}, isActiveTraining }) {
  const {
    title = "...",
    author = "...",
    year = "...",
    pages = "...",
    status,
  } = book;
  return (
    <li className={s.item}>
      {isActiveTraining ? (
        <svg className={s.icon} width="22" height="17">
          <use
            href={
              status === "read"
                ? `${sprite}#icon-checkbox`
                : `${sprite}#icon-box`
            }
          ></use>
        </svg>
      ) : (
        <svg className={s.icon} width="22" height="17">
          <use href={`${sprite}#icon-flat`}></use>
        </svg>
      )}
      <p>{title}</p>
      <p>
        <span className={s.subtitle}>Автор:</span>
        {author}
      </p>
      <p>
        <span className={s.subtitle}>Рік:</span>
        {year}
      </p>
      <p>
        <span className={s.subtitle}>Стор.:</span>
        {pages}
      </p>
    </li>
  );
}
BookItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
    status: PropTypes.string,
  }),
  isActiveTraining: PropTypes.bool.isRequired,
};

export default BookItem;
