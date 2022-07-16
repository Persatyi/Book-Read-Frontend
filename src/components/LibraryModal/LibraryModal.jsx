import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/global/global-slice';
import s from './LibraryModal.module.scss';
import Modal from '../Modal/Modal';
import spriteSvg from "assets/images/sprite.svg";

export default function LibraryEmpty() {
   const dispatch = useDispatch();
   const isCloseModal = () => {
      dispatch(toggleModal())
   }
   return (
      <Modal
         closeModal={isCloseModal}
         overClass={s.overlayLibrary}
         modalClass={s.modalLibrary}
      >
               <div className={s.library}>
               <h2 className={s.libraryTitle}>Step 1.</h2>
            <div className={s.nameWrapper}>
            <svg className={s.nameIconFlat}>
               <use href={`${spriteSvg}#icon-flat`}/>
            </svg>
                  <p className={s.name}>Create your own library</p>
               </div>
            <div className={s.textWrapper}>
            <svg className={s.textIcon}>
               <use href={`${spriteSvg}#icon-arrow`}/>
            </svg>
                  <p className={s.text}>Add there books which you are going to read.</p>
            </div>
               <h2 className={s.libraryTitle}>Step 2.</h2>
            <div className={s.nameWrapper}>
            <svg className={s.nameIconFlag}>
               <use href={`${spriteSvg}#icon-flag`}/>
            </svg>
                  <p className={s.name}
                  >Create your first training</p>
               </div>
               <div className={s.textWrapper}>
            <svg className={s.textIcon}>
               <use href={`${spriteSvg}#icon-arrow`}/>
            </svg>
                  <p className={s.text}>Set a goal, choose period, start training. </p>
            </div>
            <button type='button' onClick={isCloseModal} className={s.libraryButton}>Ok</button>
         </div>
      </Modal>
   )
};
