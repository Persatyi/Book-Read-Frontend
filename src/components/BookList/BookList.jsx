import BookItem from "components/BookItem";
import PropTypes from "prop-types";
import s from "./BookList.module.scss";

const BookList = ({
  books = [{ _id: "0" }],
  className = "",
  isActiveTraining,
}) => {
  return (
    <ul className={`${s.list} ${className}`}>
      {books.map(({ _id, ...book }) => (
        <BookItem key={_id} book={book} isActiveTraining={isActiveTraining} />
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
};

export default BookList;
