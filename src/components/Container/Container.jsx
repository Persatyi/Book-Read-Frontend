import s from "./Container.module.scss"

const Container = (props) => {
    const {children} = props
  return <div className={s.container}>{children}</div>;
};

export default Container;
