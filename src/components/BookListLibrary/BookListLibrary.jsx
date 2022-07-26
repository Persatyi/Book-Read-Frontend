import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { isAuth } from "redux/auth";
import { useBooksQuery } from "redux/api/bookAPI";
import { useToggle } from "hooks";
import useTranslation from "hooks/useTranslation";
import { ModalBookReview } from "components/Modals";

import Loader from "components/Loader";
import TitleRead from "./TitleRead/TitleRead";
import TitleReading from "./TitleReading/TitleReading";
import Rating from "components/Rating";

import spriteSvg from "assets/images/sprite.svg";
import s from "./BookListLibrary.module.scss";
import ModalBookEdit from "components/Modals/ModalBookEdit";

export default function BookListLibrary() {
  const [book, setBook] = useState(null);
  const [openReviewModal, toggleReviewModal] = useToggle();
  const [openEditModal, toggleEditModal] = useToggle();
  const auth = useSelector(isAuth);
  const { data = [], isFetching } = useBooksQuery(null, { skip: !auth });
  const { t } = useTranslation("BookListLibrary");
  const status = (e) => {
    const status = data.some((item) => item.status === e);
    return status;
  };
  const onEditBookClick = (clickedBook) => {
    setBook(clickedBook);
    toggleEditModal();
  };
  const onResumeClick = (event, clickedBook) => {
    event.stopPropagation();
    setBook(clickedBook);
    toggleReviewModal();
  };
  if (isFetching) return <Loader />;
  return (
    <>
      {status("read") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.read}</h2>
          <TitleRead />
          <ul>
            {data.map(
              (item) =>
                item.status === "read" && (
                  <li
                    key={item._id}
                    className={s.readItem}
                    onClick={() => onEditBookClick(item)}
                  >
                    <ul className={s.readBookList}>
                      <li className={s.readBookItem}>
                        <svg className={s.readBookIcon}>
                          <use href={`${spriteSvg}#icon-read`} />
                        </svg>
                        <p>{item.title}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span>{t.author}:</span>
                        <p className={s.readBookItemAuthor}>{item.author}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span>{t.year}:</span>
                        {item.year}
                      </li>
                      <li className={s.readBookItem}>
                        <span>{t.pages}:</span>
                        {item.pages}
                      </li>
                      <li className={s.readBookItem}>
                        <span>{t.rating}:</span>
                        <Rating mark={item.rating} />
                      </li>
                      <li
                        className={s.readBookButton}
                        onClick={(event) => onResumeClick(event, item)}
                      >
                        {t.resume}
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {status("reading") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.reading}</h2>
          <TitleReading />
          <ul className={s.readingList}>
            {data.map(
              (item) =>
                item.status === "reading" && (
                  <li
                    key={item._id}
                    className={s.readingItem}
                    onClick={() => onEditBookClick(item)}
                  >
                    <ul className={s.readingBookList}>
                      <li className={s.readingBookItem}>
                        <svg className={s.readingBookIcon}>
                          <use href={`${spriteSvg}#icon-reading`} />
                        </svg>
                        <p>{item.title}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.author}:</span>
                        <p className={s.readingBookItemAuthor}>{item.author}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.year}:</span>
                        {item.year}
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.pages}:</span>
                        {item.pages}
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {status("goingToRead") && (
        <div className={s.booksWrapper}>
          <h2 className={s.booksTitle}>{t.going}</h2>
          <TitleReading />
          <ul className={s.goingList}>
            {data.map(
              (item) =>
                item.status === "goingToRead" && (
                  <li
                    key={item._id}
                    className={s.readingItem}
                    onClick={() => onEditBookClick(item)}
                  >
                    <ul className={s.readingBookList}>
                      <li className={s.readingBookItem}>
                        <svg className={s.readingBookIcon}>
                          <use href={`${spriteSvg}#icon-flat`} />
                        </svg>
                        <p>{item.title}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.author}:</span>
                        <p className={s.readingBookItemAuthor}>{item.author}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.year}:</span>
                        {item.year}
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.pages}:</span>
                        {item.pages}
                      </li>
                    </ul>
                  </li>
                )
            )}
          </ul>
        </div>
      )}
      {book && (
        <>
          <ModalBookReview
            book={book}
            open={openReviewModal}
            onClose={toggleReviewModal}
          />
          <ModalBookEdit
            book={book}
            open={openEditModal}
            onClose={toggleEditModal}
          />
        </>
      )}
      {data.length > 0 && (
        <div className={s.linkWrapper}>
          <NavLink className={s.link} to="/training">
            {t.training}
          </NavLink>
        </div>
      )}
    </>
  );
}
