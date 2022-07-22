import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import { useBooksQuery } from 'redux/api/bookAPI';
import { useToggle } from "hooks";
import { ModalBookReview } from 'components/Modals';
import TitleRead from './TitleRead/TitleRead'
import TitleReading from './TitleReading/TitleReading'
import s from './BookListLibrary.module.scss';
import spriteSvg from "assets/images/sprite.svg";
import Rating from "components/Rating";


export default function BookListLibrary() {
   const [book, setBook] = useState('');
   const [openModal, toggleModal] = useToggle();
   const auth = useSelector(isAuth);
   const { data = [], isLoading } = useBooksQuery(null, { skip: !auth });
   if (isLoading) return <div className={s.loadingWrapper}>
      <div className={s.loadingSpinner}/>
   </div>
   const status = (e) => {
      const status = data.some(item => (item.status === e))
      return status;
   }
   return (
      <>
         { status("read") && (
            <div className={s.booksWrapper}>
               <h2 className={s.booksTitle}>Already read</h2>
               <TitleRead />
            <ul>
                  {data.map(item => (item.status === 'read' &&
                     <li
                     key={item._id}
                     className={s.readItem}>
                     <ul className={s.readBookList}>
                           <li className={s.readBookItem}>
                           <svg className={s.readBookIcon}>
                              <use href={`${spriteSvg}#icon-read`} />
                           </svg>
                           <p>{item.title}</p>
                        </li>
                        <li className={s.readBookItem}><span>Author:</span>{item.author}
                        </li>
                        <li className={s.readBookItem}><span>Year:</span>{item.year}
                        </li>
                        <li className={s.readBookItem}><span>Pages:</span>{item.pages}
                        </li>
                        <li className={s.readBookItem}>
                           <span>Rating:</span>
                              <Rating
                                 mark={item.rating}
                                 onChange={toggleModal}
                              />
                        </li>
                           <li className={s.readBookButton} onClick={() => {
                              setBook(item);
                           toggleModal()
                           }}>Resume
                           </li>
                        </ul>
                     </li>
               ))}
               </ul>
            </div>
         )}

         {status('reading') && (
         <div className={s.booksWrapper}>
            <h2 className={s.booksTitle}>Reading now</h2>
            <TitleReading />
            <ul className={s.readingList}>
               {data.map(item => (item.status === 'reading' &&
               <li
               key={item._id}
               className={s.readingItem}>
               <ul className={s.readingBookList}>
                  <li className={s.readingBookItem}>
                     <svg className={s.readingBookIcon}>
                        <use href={`${spriteSvg}#icon-reading`} />
                     </svg>
                     <p>{item.title}</p>
                  </li>
                  <li className={s.readingBookItem}><span>Author:</span>{item.author}
                  </li>
                  <li className={s.readingBookItem}><span>Year:</span>{item.year}
                  </li>
                  <li className={s.readingBookItem}><span>Pages:</span>{item.pages}
                  </li>
               </ul>
            </li>
               ))}
            </ul>
         </div>
         )}
         {status('goingToRead') && (
         <div className={s.booksWrapper}>
            <h2 className={s.booksTitle}>Going to read</h2>
            <TitleReading />
            <ul className={s.goingList}>
               {data.map(item => (item.status === 'goingToRead' &&
               <li
               key={item._id}
               className={s.readingItem}>
               <ul className={s.readingBookList}>
                  <li className={s.readingBookItem}>
                     <svg className={s.readingBookIcon}>
                        <use href={`${spriteSvg}#icon-flat`} />
                     </svg>
                     <p>{item.title}</p>
                  </li>
                  <li className={s.readingBookItem}><span>Author:</span>{item.author}
                  </li>
                  <li className={s.readingBookItem}><span>Year:</span>{item.year}
                  </li>
                  <li className={s.readingBookItem}><span>Pages:</span>{item.pages}
                  </li>
               </ul>
            </li>
               ))}
            </ul>
         </div>
         )}
         <ModalBookReview
            book={book}
            open={openModal}
            onClose={toggleModal}
            onClick={() => {
               setTimeout(toggleModal, 1000)
            }}
            />
         {data.length > 0 &&
            <div className={s.linkWrapper}>
               <NavLink className={s.link} to='/training'>
                  My training
               </NavLink>
            </div>}
      </>
   )
};
