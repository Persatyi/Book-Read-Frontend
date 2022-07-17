import BookItem from "components/BookItem/BookItem";
import PropTypes from "prop-types";
import s from "./BookList.module.scss";

const BookList = ({ books = [], className = "" }) => {
  return (
    <ul className={`${s.list} ${className}`}>
      {books.map(({ _id, ...book }) => (
        <li key={_id}>
          <BookItem book={book} />
        </li>
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
};

export default BookList;
