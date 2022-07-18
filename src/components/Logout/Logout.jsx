import { useEffect } from "react";
import { useLogoutMutation } from "redux/api/bookAPI";
import { useDispatch } from "react-redux";
import { loggedOff } from "redux/auth";
import { toast } from "react-toastify";
import { useToggle } from "hooks";
import {ModalLogout} from "components/Modals";
import s from "./Logout.module.scss";

const Logout = () => {
  const dispatch = useDispatch();
  const [logout, { isSuccess, isError }] = useLogoutMutation();
  const [openModal, toggleModal] = useToggle();

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedOff());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong! Try again!");
    }
  }, [isError]);

  const logoutFunc = () => {
    logout();
    toggleModal();
  }

  return (<>
    <button type="button" className={s.logoutBtn} onClick={() => toggleModal()}>
      Logout
    </button>
    <ModalLogout open={openModal} onClose={toggleModal} logoutFunc={logoutFunc} />
    </>
  );
};

export default Logout;
