import s from "./BookList.module.scss";

const BookList = ({ books, className = "" }) => {
  return (
    <ul className={`${s.list} ${className}`}>
      {books?.map(({ _id, title, author, year, pages, status }) => (
        <li key={_id}>
          <p> {title}</p>
          <p>Автор:{author}</p>
          <p>Рік:{author}</p>
          <p>Стор.:{author}</p>
        </li>
      ))}
    </ul>
  );
};
export default BookList;
