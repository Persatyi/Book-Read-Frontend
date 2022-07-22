import { useSelector } from "react-redux";

import { languageSelector } from "redux/locale";

import translationEn from "assets/locales/en/translation.json";
import translationUa from "assets/locales/ua/translation.json";
import LANGUAGES from "assets/constants/LANGUAGES";

const useTranslation = (key) => {
  const language = useSelector(languageSelector);
  let translation;
  let dateFormat = { datepicker: "", dayjs: "" };
  switch (language) {
    case LANGUAGES.EN:
      translation = translationEn;
      dateFormat = { datepicker: "MM.dd.yyyy", dayjs: "MM.DD.YYYY" };
      break;
    case LANGUAGES.UA:
      translation = translationUa;
      dateFormat = { datepicker: "dd.MM.yyyy", dayjs: "DD.MM.YYYY" };
      break;
    default:
      translation = translationEn;
      dateFormat = { datepicker: "MM.dd.yyyy", dayjs: "MM.DD.YYYY" };
  }
  const t = key ? translation[key] : translation;
  return {
    language,
    t: t ? t : {},
    dateFormat,
  };
};
export default useTranslation;
