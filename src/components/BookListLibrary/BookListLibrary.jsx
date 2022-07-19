import React from 'react';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import {useBooksQuery} from 'redux/api/bookAPI'
import TitleRead from './TitleRead/TitleRead'
import TitleReading from './TitleReading/TitleReading'
import s from './BookListLibrary.module.scss';
import spriteSvg from "assets/images/sprite.svg";


export default function BookListLibrary({ onClick }) {
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
                           <svg style={{ width: "101px", height: "17px" }}>
                              <use href={`${spriteSvg}#icon-rating`} />
                           </svg>
                        </li>
                        <li className={s.readBookButton} onClick={onClick}>Resume</li>
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
         {data.length > 0 &&
            <div className={s.linkWrapper}>
               <NavLink className={s.link} to='/training'>
                  My training
               </NavLink>
            </div>}
      </>
   )
};
