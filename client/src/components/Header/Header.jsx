import React, { useContext } from "react";
import logoImg from "../../assets/logo_several.png";
import UserIcon from "../../assets/user-icon.png";
import AuthContext from "../../context/AuthProvider";

const Header = () => {

  // const [auth] = useContext(AuthContext)

  return (
    <header>
      <img className="logo-img" src={logoImg}></img>
      <section className="asesor-info">
        <h4>¡Hola usuario!</h4>
        <img src={UserIcon} className="user-icon" alt="" />
      </section>
    </header>
  )
};

export default Header;
