import { useSelector } from "react-redux";
import { getUserName } from "redux/auth";
import s from "./UserBar.module.scss";

const UserBar = () => {
    const name = useSelector(getUserName);
    const [firstName, other] = name.split(" ");
    const [leter] = firstName.split("");

    return <div className={s.userBar}>
        <span className={s.firstLeter}>{`${leter}`}</span>
        <span className={s.userName}>{`${name}`}</span>
    </div>
}

export default UserBar;