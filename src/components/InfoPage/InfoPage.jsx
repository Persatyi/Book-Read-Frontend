import { Link } from "react-router-dom";

import Info from "components/Info/Info";
import Container from "components/Container";

import useTranslation from "hooks/useTranslation";
import s from "./InfoPage.module.scss";

const InfoPage = () => {
  const { t } = useTranslation("InfoPage");
  return (
    <div>
      <Container>
        <div className={s.wrapper}>
          <Info />
          <nav className={s.nav}>
            <Link to="/login" className={s.login}>
              {t.login}
            </Link>

            <Link to="/register" className={s.register}>
              {t.register}
            </Link>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default InfoPage;
