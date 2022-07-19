import s from "./Loader.module.scss";
import { Rings } from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Loader = () => {
  return (
    <div className={s.backdrop}>
      <Rings height="200" width="200" color="#ff6b08" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
