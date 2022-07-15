import Logout from "components/Logout/Logout";
import Navigation from "components/Navigation";
import UserBar from "components/UserBar";
import React from "react";
import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import Container  from "../Container";
import s from "./Header.module.scss";

const Header = () => {
  const isLoggedIn = useSelector(isAuth);

  const headerCls = [s.container, s.loggedIn];
  if (isLoggedIn) {
    headerCls.push(s.loggedIn);
  }

  return <header className={s.header}>
    <Container>
      <div className={headerCls.join(" ")}>
        <span className={s.logo}>BR</span>

        <Logout />
        <UserBar />
        <Navigation />

        {isLoggedIn && <>
          <UserBar />
          <Navigation />
          <Logout/>
        </>}
      </div>
    </Container>
  </header>;
};

export default Header;
