import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { isAuth } from "redux/auth";
import { useBooksQuery } from "redux/api/bookAPI";
import { useToggle } from "hooks";
import useTranslation from "hooks/useTranslation";
import { ModalBookReview } from "components/Modals";
import TitleRead from "./TitleRead/TitleRead";
import TitleReading from "./TitleReading/TitleReading";
import Rating from "components/Rating";
import Button from "components/Button";

import spriteSvg from "assets/images/sprite.svg";
import s from "./BookListLibrary.module.scss";

export default function BookListLibrary() {
  const [book, setBook] = useState("");
  const [openModal, toggleModal] = useToggle();
  const auth = useSelector(isAuth);
  const { data = [], isLoading } = useBooksQuery(null, { skip: !auth });
  const { t } = useTranslation("BookListLibrary");
  if (isLoading)
    return (
      <div className={s.loadingWrapper}>
        <div className={s.loadingSpinner} />
      </div>
    );
  const status = (e) => {
    const status = data.some((item) => item.status === e);
    return status;
  };
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
                  <li key={item._id} className={s.readItem}>
                    <ul className={s.readBookList}>
                      <li className={s.readBookItem}>
                        <svg className={s.readBookIcon}>
                          <use href={`${spriteSvg}#icon-read`} />
                        </svg>
                        <p className={s.readBookItemTitle}>{item.title}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.author}:
                        </span>
                        <p className={s.readBookItemText}>{item.author}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.year}:
                        </span>
                        <p className={s.readBookItemText}>{item.year}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.pages}:
                        </span>
                        <p className={s.readBookItemText}>{item.pages}</p>
                      </li>
                      <li className={s.readBookItem}>
                        <span className={s.readBookItemCategory}>
                          {t.rating}:
                        </span>
                        <Rating mark={item.rating} onChange={toggleModal} />
                      </li>
                      <li>
                        <Button
                          onClick={() => {
                            setBook(item);
                            toggleModal();
                          }}
                          className={s.readBookButton}
                          styleType="secondary"
                          text={t.resume}
                        />
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
                  <li key={item._id} className={s.readingItem}>
                    <ul className={s.readingBookList}>
                      <li className={s.readingBookItem}>
                        <svg className={s.readingBookIcon}>
                          <use href={`${spriteSvg}#icon-reading`} />
                        </svg>
                        <p>{item.title}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.author}:</span>
                        <p className={s.readingAuthorText}>{item.author}</p>
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
                  <li key={item._id} className={s.readingItem}>
                    <ul className={s.readingBookList}>
                      <li className={s.readingBookItem}>
                        <svg className={s.readingBookIcon}>
                          <use href={`${spriteSvg}#icon-flat`} />
                        </svg>
                        <p>{item.title}</p>
                      </li>
                      <li className={s.readingBookItem}>
                        <span>{t.author}:</span>
                        {item.author}
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
      <ModalBookReview
        book={book}
        open={openModal}
        onClose={toggleModal}
        onClick={() => {
          setTimeout(toggleModal, 1000);
        }}
      />
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
