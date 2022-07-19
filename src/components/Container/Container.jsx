import s from "./Container.module.scss";

const Container = (props) => {
  const { children, className } = props;
  return <div className={`${s.container} ${className}`}>{children}</div>;
};

export default Container;
