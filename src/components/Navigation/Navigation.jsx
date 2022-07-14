import { NavLink } from "react-router-dom";
import sprite from "../../assets/images/sprite.svg"
import s from "./Navigation.module.scss";

const Navigation = () => {
    
    return <nav className={s.nav}>
        <NavLink exact to="/training" className={s.nav_link} activeClassName={s.activeLink}>
            <svg className={s.navSvg}>
                <use href={`${sprite}#icon-flat`}></use>
            </svg>
        </NavLink>

        <NavLink to="/library" className={s.nav_link} activeClassName={s.activeLink}>
            <svg className={s.navSvg}>
                <use href={`${sprite}#icon-home`}></use>
            </svg>
        </NavLink>
    </nav>
}

export default Navigation;