import { NavLink } from "react-router-dom";
import s from "./Navigation.module.scss";

const Navigation = () => {
    
    return <nav className={s}>
        <NavLink exact to="/library" className={s.link} activeClassName={s.activeLink}>1</NavLink>

        <NavLink to="/training" className={s.link} activeClassName={s.activeLink}>2</NavLink>
    </nav>
}

export default Navigation;