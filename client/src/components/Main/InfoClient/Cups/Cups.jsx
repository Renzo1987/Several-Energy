import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import FormCups from "./FormCups";
import { useInfoCliente } from "../../../../context/InfoClienteProvider"; 

const CUPS_REGEX = /^.{0,22}$/

const Cups = () => {

  const { setCup } = useInfoCliente();
  const [cups, setCups] = useState("");
  const [validCups, setValidCups] = useState(true)



  useEffect(() => {
    setValidCups(CUPS_REGEX.test(cups))
  }, [cups])

  const handleContinue = () => {
    setCup(cups)
  }

  return (
    <section id="cups-section">
      <FormCups cups={cups} setCups={setCups} />
      <p id="cupsnote" className={cups && !validCups ? "instructions" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} />
            El CUPS no puede ser mayor de 22 caracteres.
      </p>
      <article className="navigation-sct">
        <Link to="/home">
          <button className="back-btn">Atrás</button>
        </Link>
        <Link to="/client">
          <button disabled={!validCups || !cups ? true : false} className="continue-btn" onClick={handleContinue}>Continuar</button>
        </Link>
      </article>
      
      {/* {aquí no sé si va a vista a "/client" pero contemplando sin CUPS} */}
    </section>
  );
};

export default Cups;

