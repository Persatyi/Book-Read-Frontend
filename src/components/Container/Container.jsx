import s from "./Container.module.scss";

const Container = (props) => {
  const { children, className = "" } = props;
  return <div className={`${className} ${s.container}`}>{children}</div>;
};

export default Container;
