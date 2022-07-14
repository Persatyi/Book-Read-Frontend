import { useSelector } from "react-redux";
import { getAuth } from "redux/auth";
import { useCurrentQuery } from "redux/api/bookAPI";
import s from "./UserBar.module.scss";

const UserBar = () => {
    const isAuth = useSelector(getAuth);
    const { data, isFetching } = useCurrentQuery(null, { skip: !isAuth });
    
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