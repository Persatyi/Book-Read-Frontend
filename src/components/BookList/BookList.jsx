import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import BookItem from "components/BookItem";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import s from "./BookList.module.scss";

const BookList = ({
  books = [{ _id: "0" }],
  className = "",
  isActiveTraining,
  chosenBooks,
  deleteBook,
}) => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return (
    <ul className={`${s.list} ${className}`}>
      {!isMobile && (
        <div className={s.head}>
          <span className={s.subtitle}>Назва книги:</span>
          <span className={s.subtitle}>Автор:</span>
          <span className={s.subtitle}>Рік:</span>
          <span className={s.subtitle}>Стор.:</span>
        </div>
      )}
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          isActiveTraining={isActiveTraining}
          chosenBooks={chosenBooks}
          deleteBook={deleteBook}
        />
      ))}
    </ul>
  );
};
BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      author: PropTypes.string,
      year: PropTypes.number,
      pages: PropTypes.number,
      status: PropTypes.string,
    })
  ),
  closed: PropTypes.string,
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

export default BookList;
