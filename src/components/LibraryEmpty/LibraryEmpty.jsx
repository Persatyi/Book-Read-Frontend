import React from "react";
import PropTypes from "prop-types";
import spriteSvg from "assets/images/sprite.svg";
import { useClickOutside, useWindowSize } from "hooks";
import Button from "components/Button";
import s from "./LibraryEmpty.module.scss";

const LibraryEmpty = (props) => {
  const outsideClicker = useClickOutside(props.onClose);
  const size = useWindowSize();
  return (
    props.open && (
      <div ref={outsideClicker} className={s.library}>
        <h2 className={s.libraryTitle}>Step 1.</h2>
        <div className={s.nameWrapper}>
          <svg className={s.nameIconFlat}>
            <use href={`${spriteSvg}#icon-flat`} />
          </svg>
          <p className={s.name}>Create your own library</p>
        </div>
        <div className={s.textWrapper}>
          <svg className={s.textIcon}>
            <use href={`${spriteSvg}#icon-arrow`} />
          </svg>
          <p className={s.text}>Add there books which you are going to read.</p>
        </div>
        <h2 className={s.libraryTitle}>Step 2.</h2>
        <div className={s.nameWrapper}>
          <svg className={s.nameIconFlag}>
            <use href={`${spriteSvg}#icon-flag`} />
          </svg>
          <p className={s.name}>Create your first training</p>
        </div>
        <div className={s.textWrapper}>
          <svg className={s.textIcon}>
            <use href={`${spriteSvg}#icon-arrow`} />
          </svg>
          <p className={s.text}>Set a goal, choose period, start training. </p>
        </div>
        {size.width < 768 && (
          <Button
            text={"Ok"}
            onClick={props.onClose}
            className={s.libraryButton}
          ></Button>
        )}
      </div>
    )
  );
};

LibraryEmpty.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LibraryEmpty;
