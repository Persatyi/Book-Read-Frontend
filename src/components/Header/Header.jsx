import s from "./Header.module.scss";
import sprite from "../../assets/images/sprite.svg"

const Header = () => {
  return <div>Header
    <svg className={s.icon}>
      <use href={`${sprite}#icon-arrow`}></use>
    </svg>
  </div>;
};

export default Header;
