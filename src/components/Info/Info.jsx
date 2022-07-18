import s from "./Info.module.scss";
import sprite from "../../assets/images/sprite.svg";
const Info = () => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Books Reading</h1>
      <div className={s.listWrapper}>
        <p className={s.listTitle}>Will help you to</p>
        <ul className={s.list}>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>
              Create your goal faster and proceed to read
            </p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>
              Divide process proportionally for each day
            </p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>Track your success</p>
          </li>
        </ul>
      </div>
      <div>
        <p className={s.listTitle}>You may also</p>
        <ul className={s.list}>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>
              Pose your own independent point of view
            </p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>
              Improve your professional skills according to new knowledge
            </p>
          </li>
          <li className={s.item}>
            <svg className={s.itemSvg}>
              <use href={`${sprite}#icon-item`}></use>
            </svg>
            <p className={s.itemText}>Become an interesting interlocutor</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Info;
