import LanguageSwitcher from "components/LanguageSwitcher";
import Logout from "components/Logout/Logout";
import Navigation from "components/Navigation";
import UserBar from "components/UserBar";
import React from "react";
import { useSelector } from "react-redux";
import { isAuth } from "redux/auth";
import s from "./Header.module.scss";

const Header = () => {
  const isLoggedIn = useSelector(isAuth);

  const headerCls = [s.container];
  if (isLoggedIn) {
    headerCls.push(s.loggedIn);
  }

  return (
    <header className={s.header}>
      <div className={headerCls.join(" ")}>
        <span className={s.logo}>BR</span>
        <LanguageSwitcher />
        {isLoggedIn && (
          <>
            <UserBar />
            <Navigation />
            <Logout />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
