import s from "./InfoPage.module.scss";
import { Link } from "react-router-dom";
import Info from "components/Info/Info";
import Container from "components/Container";

const InfoPage = () => {
  return (
    <Container>
      <div className={s.wrapper}>
        <Info />
        <nav className={s.nav}>
          <Link to="/login" className={s.login}>
            Log in
          </Link>

          <Link to="/register" className={s.register}>
            Register
          </Link>
        </nav>
      </div>
    </Container>
  );
};

export default InfoPage;
