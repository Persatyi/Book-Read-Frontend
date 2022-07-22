import useTranslation from "hooks/useTranslation";
import sprite from "../../assets/images/sprite.svg";
import s from "./Info.module.scss";

const Info = () => {
  const { t } = useTranslation("Info");
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Books Reading</h1>
      <div className={s.listWrapper}>
        <p className={s.listTitle}>{t.help}</p>
        <ul className={s.list}>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>{t.goal}</p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>{t.divide}</p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>{t.track}</p>
          </li>
        </ul>
      </div>
      <div>
        <p className={s.listTitle}>{t.also}</p>
        <ul className={s.list}>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>{t.pose}</p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>{t.improve}</p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>{t.become}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
