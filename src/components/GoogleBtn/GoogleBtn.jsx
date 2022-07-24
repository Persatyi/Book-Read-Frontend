import s from "./GoogleBtn.module.scss";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGoogleLoginMutation } from "redux/api/bookAPI";
import { useDispatch } from "react-redux";
import { loggedIn } from "redux/auth";
import useTranslation from "hooks/useTranslation";

const GoogleBtn = () => {
  const dispatch = useDispatch();
  const [googleLoginUser] = useGoogleLoginMutation();
  const { language } = useTranslation();

  function handleCallback(resp) {
    const googleToken = resp.credential;

    const googleObj = {
      googleToken,
    };
    googleLoginUser(googleObj)
      .unwrap()
      .then((response) =>
        dispatch(
          loggedIn({
            token: response.token,
            refreshToken: response.refreshToken,
          })
        )
      )
      .catch((error) => {
        if (error.status === 409) {
          toast.error(
            "Account with this email was ceated with a different signup method!"
          );
        }
      });
  }

  const [locale] = language.split("-");

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallback,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInBtn"),
      {
        type: "standard",
        theme: "outline",
        size: "medium",
        width: "40",
        height: "50",
        locale: `${locale}`,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return <div id="signInBtn" className={s.signInBtn}></div>;
};

export default GoogleBtn;
