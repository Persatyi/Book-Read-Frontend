import React from 'react';
import s from './TitleReading.module.scss';

export default function TitleReading() {
   return (
      <ul className={s.titleList}>
         <li className={s.titleListItem}>Book title</li>
         <li className={s.titleListItem}>Author</li>
         <li className={s.titleListItem}>Year</li>
         <li className={s.titleListItem}>Pages</li>
      </ul>
   )
};
