import { useEffect } from "react";
import getUserLocale from "get-user-locale";

import useTranslation from "hooks/useTranslation";

import LANGUAGES from "assets/constants/LANGUAGES";
import english from "assets/images/locales/english.png";
import ukraine from "assets/images/locales/ukrainian.png";

import IconButton, { TYPES } from "components/IconButton";
import { useDispatch } from "react-redux";
import { setLocale } from "redux/locale";

import s from "./LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
  const userLocale = getUserLocale();
  const { t, language } = useTranslation("LanguageSwitcher");
  const dispatch = useDispatch();

  const changeLanguage = (lang) => {
    dispatch(setLocale(lang));
  };

  useEffect(() => {
    if (language) return;
    changeLanguage(userLocale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.wrapBtn}>
      <IconButton
        onClick={() => changeLanguage(LANGUAGES.EN)}
        className={s.btn}
        label={t.label}
        type={TYPES.HOC}
      >
        <img src={english} alt="English" />
      </IconButton>
      <IconButton
        onClick={() => changeLanguage(LANGUAGES.UA)}
        className={s.btn}
        label={t.label}
        type={TYPES.HOC}
      >
        <img src={ukraine} alt="Ukrainian" />
      </IconButton>
    </div>
  );
};

export default LanguageSwitcher;
