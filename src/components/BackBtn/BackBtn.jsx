import React from 'react';
import spriteSvg from "assets/images/sprite.svg";
import s from './BackBtn.module.scss';

export default function BackBtn({onClick}) {
   return(
   <svg onClick={onClick} className={s.backBtn}>
      <use href={`${spriteSvg}#icon-back`} />
   </svg>
   )
};
