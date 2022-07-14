import Logout from "components/Logout/Logout";
import Navigation from "components/Navigation";
import UserBar from "components/UserBar";
import React from "react";
import { useSelector } from "react-redux";
import { getAuth } from "redux/auth";
import s from "./Header.module.scss";

const Header = () => {
  const isLoggedIn = useSelector(getAuth);

  return <header>
    <div className={s.container}>
      <section className={s.header}>
        <span className={s.logo}>BR</span>
        
        {isLoggedIn && <div>
          <UserBar />
          <Navigation />
          <Logout/>
        </div>}
      </section>
    </div>
  </header>;
};

export default Header;
