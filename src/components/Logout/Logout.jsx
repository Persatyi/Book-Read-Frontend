import { useEffect } from "react";
import { useLogoutMutation } from "redux/api/bookAPI";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { loggedOff } from "redux/auth";

import { ModalLogout } from "components/Modals";

import { useToggle } from "hooks";
import useRefreshToken from "hooks/useRefreshToken";
import useTranslation from "hooks/useTranslation";
import s from "./Logout.module.scss";

const Logout = () => {
  const dispatch = useDispatch();
  const [logout, { isError }] = useLogoutMutation();
  const [openModal, toggleModal] = useToggle();
  const checkRefreshToken = useRefreshToken();
  const { t } = useTranslation("Logout");

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(loggedOff());
  //   }
  // }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(t.error);
    }
  }, [isError, t.error]);

  const logoutFunc = async () => {
    await logout();
    dispatch(loggedOff());
    toggleModal();
  };

  return (
    <>
      <button
        type="button"
        className={s.logoutBtn}
        onClick={() => {
          checkRefreshToken();
          toggleModal();
        }}
      >
        {t.text}
      </button>
      <ModalLogout
        open={openModal}
        onClose={toggleModal}
        logoutFunc={logoutFunc}
      />
    </>
  );
};

export default Logout;
