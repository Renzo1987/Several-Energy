import React, { useState } from "react";
import FormCups from "./FormCups";
import { useInfoCliente } from "../../../../context/InfoClienteProvider"; 
import { Link } from "react-router-dom";

const Cups = () => {
  const { setCup } = useInfoCliente();
  const [cups, setCups] = useState("");

  const handleContinue = () => {
    if (cups.length === 5) {
      setCup(cups);
    } else {
      console.error("CUPS incorrecto");
    }
  };

  return (
    <section id="cups-section">
      <FormCups cups={cups} setCups={setCups} />

      <article className="navigation-sct">
        <Link to="/home">
          <button className="back-btn">Atrás</button>
        </Link>
        <Link to="/client">
          <button className="continue-btn" onClick={handleContinue}>Continuar</button>
        </Link>
      </article>
      
      {/* {aquí no sé si va a vista a "/client" pero contemplando sin CUPS} */}
    </section>
  );
};

export default Cups;

