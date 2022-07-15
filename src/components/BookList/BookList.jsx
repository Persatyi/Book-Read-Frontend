import React from 'react';
import TitleRead from './TitleRead/TitleRead'
import TitleReading from './TitleReading/TitleReading'
import s from './BookList.module.scss';
import readIcon from '../../assets/images/library/readIcon.svg';
// import readingIcon from '../../assets/images/library/readingIcon.svg';
// import goingIcon from '../../assets/images/library/goingIcon.svg';
import rating from '../../assets/images/library/rating.svg'
import Container from '../Container/Container';

export default function BookList({onClick}) {
   return (
         <Container>
         <div className={s.booksWrapper}>
         <h2 className={s.booksTitle}>Already read</h2>
               <TitleRead />
            <ul>
               <li
                  // key={_id}
                  className={s.readItem}>
                  <ul className={s.readBookList}>
                     <li className={s.readBookItem}>
                        <img className={s.readBookImg} src={readIcon} alt='book grey icon' />
                        <span>A mental hospital in Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, autem.</span>
                        {/* {title} */}
                     </li>
                     <li className={s.readBookItem}>Cooper Alan
                     {/* author */}
                     </li>
                     <li className={s.readBookItem}>2009
                     {/* year */}
                     </li>
                     <li className={s.readBookItem}>183
                     {/* pages */}
                     </li>
                     <li className={s.readBookItem}>
                        <img src={rating} alt='rating' />
                     {/* rating */}
                     </li>
                     <li className={s.readBookButton} onClick={onClick}>Resume</li>
                  </ul>
                     <li className={s.readBookItem}></li>
               </li>
         </ul>
         </div>
            <div className={s.booksWrapper}>
            <h2 className={s.booksTitle}>Reading now</h2>
               <TitleReading />
            <ul className={s.readingList}>
               <li className={s.readingItem}>2</li>
            </ul>
         </div>
            <div className={s.booksWrapper}>
            <h2 className={s.booksTitle}>Going to read</h2>
               <TitleReading />
            <ul className={s.goingList}>
               <li className={s.goingItem}>3</li>
            </ul>
            </div>
         </Container>
   )
};
