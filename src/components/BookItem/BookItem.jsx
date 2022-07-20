import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import IconButton, { TYPES } from "components/IconButton";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import sprite from "assets/images/sprite.svg";

import s from "./BookItem.module.scss";

function BookItem({ book = {}, isActiveTraining, chosenBooks, deleteBook }) {
  const {
    _id,
    title = "...",
    author = "...",
    year = "...",
    pages = "...",
    status,
  } = book;
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const onDeleteClick = () => {
    deleteBook(_id);
  };

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
      {!isActiveTraining && (
        <IconButton
          onClick={onDeleteClick}
          label="Видалити книгу"
          type={TYPES.DELETE}
          className={s.delete}
        />
      )}
      <p className={s.title}>{title}</p>
      <p>
        {isMobile && <span className={s.subtitle}>Автор:</span>}
        {author}
      </p>
      <p>
        {isMobile && <span className={s.subtitle}>Рік:</span>}
        {year}
      </p>
      <p>
        {isMobile && <span className={s.subtitle}>Стор.:</span>}
        {pages}
      </p>
    </li>
  );
}
BookItem.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    year: PropTypes.number,
    pages: PropTypes.number,
    status: PropTypes.string,
  }),
  isActiveTraining: PropTypes.bool.isRequired,
  chosenBooks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.number,
      pages: PropTypes.number,
      status: PropTypes.string,
    })
  ),
  deleteBook: PropTypes.func,
};

export default BookItem;
