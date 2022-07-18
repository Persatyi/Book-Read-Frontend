import React from 'react';
import { NavLink } from "react-router-dom";
import TitleRead from './TitleRead/TitleRead'
import TitleReading from './TitleReading/TitleReading'
import s from './BookListLibrary.module.scss';
import spriteSvg from "assets/images/sprite.svg";


export default function BookListLibrary({onClick}) {
   return (
      <>
         <div className={s.booksWrapper}>
         <h2 className={s.booksTitle}>Already read</h2>
         <TitleRead />
         <ul>
            <li
               // key={_id}
               className={s.readItem}>
               <ul className={s.readBookList}>
                  <li className={s.readBookItem}>
                     <svg className={s.readBookIcon}>
                        <use href={`${spriteSvg}#icon-read`} />
                     </svg>
                     <p>A mental hospital in Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, autem.</p>
                     {/* {title} */}
                  </li>
                  <li className={s.readBookItem}><span>Author:</span>Cooper Alan
                     {/* author */}
                  </li>
                  <li className={s.readBookItem}><span>Year:</span>2009
                     {/* year */}
                  </li>
                  <li className={s.readBookItem}><span>Pages:</span>183
                     {/* pages */}
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
         </ul>
      </div>
         <div className={s.booksWrapper}>
            <h2 className={s.booksTitle}>Reading now</h2>
            <TitleReading />
            <ul className={s.readingList}>
               <li
               // key={_id}
               className={s.readingItem}>
               <ul className={s.readingBookList}>
                  <li className={s.readingBookItem}>
                     <svg className={s.readingBookIcon}>
                        <use href={`${spriteSvg}#icon-reading`} />
                     </svg>
                     <p>A mental hospital in Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, autem.</p>
                     {/* {title} */}
                  </li>
                  <li className={s.readingBookItem}><span>Author:</span>Cooper Alan
                     {/* author */}
                  </li>
                  <li className={s.readingBookItem}><span>Year:</span>2009
                     {/* year */}
                  </li>
                  <li className={s.readingBookItem}><span>Pages:</span>183
                     {/* pages */}
                  </li>
               </ul>
            </li>
            </ul>
         </div>
         <div className={s.booksWrapper}>
            <h2 className={s.booksTitle}>Going to read</h2>
            <TitleReading />
            <ul className={s.goingList}>
               <li
               // key={_id}
               className={s.readingItem}>
               <ul className={s.readingBookList}>
                  <li className={s.readingBookItem}>
                     <svg className={s.readingBookIcon}>
                        <use href={`${spriteSvg}#icon-flat`} />
                     </svg>
                     <p>A mental hospital in Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, autem.</p>
                     {/* {title} */}
                  </li>
                  <li className={s.readingBookItem}><span>Author:</span>Cooper Alan
                     {/* author */}
                  </li>
                  <li className={s.readingBookItem}><span>Year:</span>2009
                     {/* year */}
                  </li>
                  <li className={s.readingBookItem}><span>Pages:</span>183
                     {/* pages */}
                  </li>
               </ul>
            </li>
            </ul>
         </div>
         <div className={s.linkWrapper}>
         <NavLink className={s.link} to='/training'>
            My training
            </NavLink>
         </div>
      </>
   )
};
