import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo_several.png";
import UserIcon from "../../assets/user-icon.png";
import AuthContext from "../../context/AuthProvider";
import UserDropDown from "./UserDropDown/UserDropDown";

const Header = () => {
  
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!auth.asesor) {
    navigate("/login")
  }

   return (
    <header className={ !auth.asesor ? "offscreen" : "header" }>
      <img className="logo-img" src={logoImg}></img>
      <section className="asesor-info">
        <h4>¡Hola {auth.asesor}!</h4>
        <UserDropDown className="transparent-hover"/>
      </section>
    </header>
  )
};

export default Header;
