import React from 'react';
import spriteSvg from "assets/images/sprite.svg";
import s from './MoreBtn.module.scss';

export default function MoreBtn({onClick}) {
   return (
      <svg onClick={onClick} className={s.moreBtn}>
      <use href={`${spriteSvg}#icon-more`} />
   </svg>
   )
};
