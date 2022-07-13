import React from 'react';
import s from './LibraryModal.module.scss';
import library from '../../assets/images/library/libraryIcon.svg'
import flag from '../../assets/images/library/flagIcon.svg';
import arrow from '../../assets/images/library/arrowIcon.svg';
export default function LibraryModal() {
   return (
      <div className={s.library}>
            <h2 className={s.libraryTitle}>Step 1.</h2>
            <div className={s.nameWrapper}>
               <img className={s.nameIcon} src={library} alt='library icon'/>
               <p className={s.name}>Create your own library</p>
            </div>
            <div className={s.textWrapper}>
               <img className={s.textIcon} src={arrow} alt='arrow icon'/>
               <p className={s.text}>Add there books which you are going to read.</p>
         </div>
            <h2 className={s.libraryTitle}>Step 2.</h2>
            <div className={s.nameWrapper}>
               <img className={s.nameIcon} src={flag} alt='flag icon'/>
               <p className={s.name}
               >Create your first training</p>
            </div>
            <div className={s.textWrapper}>
               <img className={s.textIcon} src={arrow} alt='arrow icon'/>
               <p className={s.text}>Set a goal, choose period, start training. </p>
            </div>
      </div>
   )
};
