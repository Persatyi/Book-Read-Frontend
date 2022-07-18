import { useEffect } from "react";
import { useLogoutMutation } from "redux/api/bookAPI";
import { useDispatch } from "react-redux";
import { loggedOff } from "redux/auth";
import { toast } from "react-toastify";
import s from "./Logout.module.scss";

const Logout = () => {
  const dispatch = useDispatch();
  const [logout, { isSuccess, isError }] = useLogoutMutation();

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

  return (
    <button type="button" className={s.logoutBtn} onClick={() => logout()}>
      Logout
    </button>
  );
};

export default Logout;
