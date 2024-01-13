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
    <>
      <FormCups cups={cups} setCups={setCups} />
      <Link to="/client">
        <button onClick={handleContinue}>Continuar</button>
      </Link>
      <Link to="/#">No tengo el CUPS</Link> 
      {/* {aquí no sé si va a vista a "/client" pero contemplando sin CUPS} */}
    </>
  );
};

export default Cups;

