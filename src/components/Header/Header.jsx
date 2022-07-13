import Logout from "components/Logout/Logout";
import Navigation from "components/Navigation";
import UserBar from "components/UserBar";
import React from "react";
import s from "./Header.module.scss";

const Header = () => {

  return <header>
    <section className={s.header}>
      <span className={s.logo}>BR</span>

      <UserBar />
      <Navigation />
      <Logout/>
    </section>
  </header>;
};

export default Header;
