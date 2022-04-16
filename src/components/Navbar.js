import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  return (
    <nav>
      {(toggleMenu || screenWidth > 500) && (
        <ul className={styles.list}>
          <NavLink className={styles.items} activeClassName="active" to="/mark">
            Marking
          </NavLink>
          <NavLink className={styles.items} activeClassName="active" to="/link">
            Linking
          </NavLink>
          <NavLink className={styles.items} activeClassName="active" to="/vid">
            VTOUR
          </NavLink>
          <NavLink className={styles.items} activeClassName="active" to="/plan">
            plan
          </NavLink>
          <NavLink className={styles.items} activeClassName="active" to="/upload">
            upload
          </NavLink>
        </ul>
      )}
      <button onClick={toggleNav} className={styles.btn}>
        BTN
      </button>
    </nav>
  );
}
