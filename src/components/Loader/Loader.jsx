import { Rings } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import useTranslation from "hooks/useTranslation";
import s from "./Loader.module.scss";

export const TYPES = {
  LOCAL: "local",
  FULLSCREEN: "fullscreen",
};

const Loader = ({ type = TYPES.LOCAL }) => {
  const { t } = useTranslation("Loader");
  return (
    <div className={s[type]}>
      <Rings height="200" width="200" color="#ff6b08" ariaLabel={t.label} />
    </div>
  );
};

export default Loader;
