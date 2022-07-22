import useTranslation from "hooks/useTranslation";
import { NavLink } from "react-router-dom";

import sprite from "../../assets/images/sprite.svg";
import s from "./Navigation.module.scss";

const Navigation = () => {
  const { t } = useTranslation("Navigation");

  return (
    <nav className={s.nav}>
      <NavLink
        to="/training"
        className={s.nav_link}
        activeclassname={s.activeLink}
        aria-label={t.training}
      >
        <svg className={s.navSvg}>
          <use href={`${sprite}#icon-flat`}></use>
        </svg>
      </NavLink>

      <NavLink
        to="/library"
        className={s.nav_link}
        activeclassname={s.activeLink}
        aria-label={t.library}
      >
        <svg className={s.navSvg}>
          <use href={`${sprite}#icon-home`}></use>
        </svg>
      </NavLink>
    </nav>
  );
};

export default Navigation;
