import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSchool, FaTimes, FaBars } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

    const [active, setActive] = useState("nav__menu")
    const [isMobile, setisMobile] = useState(false)
    const navToggle = () => {
      if (active === "nav__menu") {
        setActive("nav__menu nav__active");
      } else setActive("nav__menu");
      setisMobile(!isMobile)
    }

  return (
    <div>
      <nav className="nav__bar">
        <Link to="" className="logo" onClick={navToggle}>
          <FaSchool/>
        </Link>
        <ul className={active}>
          <li className="nav__item">
            <Link to="/" className="nav__link" onClick={navToggle}>
              Home
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/Login" className="nav__link" onClick={navToggle}>
              Login
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/Signup" className="nav__link" onClick={navToggle}>
              Register
            </Link>
          </li>
        </ul>
        <button className="btn menu__icon" onClick={navToggle}>
          {isMobile ? (
            <FaTimes className="icon" />
          ) : (
            <FaBars className="icon" />
          )}
        </button>
      </nav>
    </div>
  );
}

export default Navbar;

