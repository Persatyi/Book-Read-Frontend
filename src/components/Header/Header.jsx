import Logout from "components/Logout/Logout";
import Navigation from "components/Navigation";
import UserBar from "components/UserBar";
import React from "react";
import { useSelector } from "react-redux";
import { getAuth } from "redux/auth";
import s from "./Header.module.scss";

const Header = () => {
  const isLoggedIn = useSelector(getAuth);

  const headerCls = [s.container];
  if (isLoggedIn) {
    headerCls.push(s.loggedIn);
  }

  return <header>
    <section className={s.header }>
      <div className={headerCls.join(" ")}>
        <span className={s.logo}>BR</span>

        {isLoggedIn && <>
          <UserBar />
          <Navigation />
          <Logout/>
        </>}
      </div>
    </section>
  </header>;
};

export default Header;
