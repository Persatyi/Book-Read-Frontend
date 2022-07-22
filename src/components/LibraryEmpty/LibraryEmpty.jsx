import PropTypes from "prop-types";

import Button from "components/Button";

import { useClickOutside, useWindowSize } from "hooks";
import spriteSvg from "assets/images/sprite.svg";
import s from "./LibraryEmpty.module.scss";
import useTranslation from "hooks/useTranslation";

const LibraryEmpty = (props) => {
  const outsideClicker = useClickOutside(props.onClose);
  const size = useWindowSize();
  const { t } = useTranslation("LibraryEmpty");

  return (
    props.open && (
      <div ref={outsideClicker} className={s.library}>
        <h2 className={s.libraryTitle}>{t.step1}</h2>
        <div className={s.nameWrapper}>
          <svg className={s.nameIconFlat}>
            <use href={`${spriteSvg}#icon-flat`} />
          </svg>
          <p className={s.name}>{t.library}</p>
        </div>
        <div className={s.textWrapper}>
          <svg className={s.textIcon}>
            <use href={`${spriteSvg}#icon-arrow`} />
          </svg>
          <p className={s.text}>{t.add}</p>
        </div>
        <h2 className={s.libraryTitle}>{t.step2}</h2>
        <div className={s.nameWrapper}>
          <svg className={s.nameIconFlag}>
            <use href={`${spriteSvg}#icon-flag`} />
          </svg>
          <p className={s.name}>{t.training}</p>
        </div>
        <div className={s.textWrapper}>
          <svg className={s.textIcon}>
            <use href={`${spriteSvg}#icon-arrow`} />
          </svg>
          <p className={s.text}>{t.goal}</p>
        </div>
        {size.width < 768 && (
          <Button
            text={t.button}
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
