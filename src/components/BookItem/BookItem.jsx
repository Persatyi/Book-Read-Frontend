import PropTypes from "prop-types";
// import s from "./BookItem.module.scss";

function BookItem({ book = {} }) {
  const {
    title = "...",
    author = "...",
    year = "...",
    pages = "...",
    status,
  } = book;
  return (
    <>
      <p>{title}</p>
      <p>Автор:{author}</p>
      <p>Рік:{year}</p>
      <p>Стор.:{pages}</p>
    </>
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
};

export default BookItem;
