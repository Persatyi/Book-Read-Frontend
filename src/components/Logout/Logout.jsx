import { useLogoutQuery } from "redux/auth";
import s from "./Logout.module.scss";

const Logout = () => {
    const [logout] = useLogoutQuery();
    
    return <button type="button" className={s.logoutBtn} onClick={() => logout()}>
        Вихід
    </button>
};

export default Logout;