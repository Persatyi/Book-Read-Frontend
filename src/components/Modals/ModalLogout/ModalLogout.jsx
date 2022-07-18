import Button from "components/Button";
import s from "./ModalLogout.module.scss";

const ModalLogout = () => {
    return (
        <div className={s.modal}>
            <p className={s.text}>Якщо Ви вийдете з програми незбережені дані будуть втрачені</p>
            <div className={s.btnBox}>
                <Button className={s} type={"button"} text={"Відміна"} onClick="" />
                <Button className={s} type={"button"} text={"Вийти"} onClick="" />
            </div>
            
        </div>
    )
};

export default ModalLogout;