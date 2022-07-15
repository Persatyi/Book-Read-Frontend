import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import { useCurrentQuery } from "redux/api/bookAPI";
import s from "./UserBar.module.scss";

const UserBar = () => {
    const auth = useSelector(isAuth);
    const { data } = useCurrentQuery(null, { skip: !auth });
    
    let userName = "Mark Hunt";
    if (data) {
        userName = data.name;
    }
    
    const [firstName] = userName.split(" ");
    const [leter] = firstName.split("");

    return (
    <div className={s.userBar}>
        <span className={s.firstLeter}>{`${leter}`}</span>
        <span className={s.userName}>{`${userName}`}</span>
    </div>
)}

export default UserBar;