import { useSelector } from "react-redux";

import { languageSelector } from "redux/locale";

import translationEn from "assets/locales/en/translation.json";
import translationUa from "assets/locales/ua/translation.json";
import LANGUAGES from "assets/constants/LANGUAGES";

const useTranslation = (key) => {
  const language = useSelector(languageSelector);
  let translation;
  let dateFormat;
  switch (language) {
    case LANGUAGES.EN:
      translation = translationEn;
      dateFormat = "MM.dd.yyyy";
      break;
    case LANGUAGES.UA:
      translation = translationUa;
      dateFormat = "dd.MM.yyyy";
      break;
    default:
      translation = translationEn;
      dateFormat = "MM.dd.yyyy";
  }
  const t = key ? translation[key] : translation;
  return {
    language,
    t: t ? t : {},
    dateFormat,
  };
};
export default useTranslation;
