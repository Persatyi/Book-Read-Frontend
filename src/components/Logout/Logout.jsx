import { useLogoutQuery } from "redux/auth";
import { useDispatch } from "react-redux";
import { loggedOff } from "redux/auth";
import s from "./Logout.module.scss";

const Logout = () => {
    const dispatch = useDispatch();
    // const [logout] = useLogoutQuery();

    const onClickFunc = async () => {
        // await logout();
        dispatch(loggedOff);
    }
    
    return <button type="button" className={s.logoutBtn} onClick= {() => onClickFunc()}>
        Вихід
    </button>
};

export default Logout;