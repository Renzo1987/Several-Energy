<<<<<<< HEAD
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

=======
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import FormCups from "./FormCups";
import { useInfoCliente } from "../../../../context/InfoClienteProvider"; 
import ConsumosAnualesContext from "../../../../context/ConsumosAnualesProvider";

const CUPS_REGEX = /^.{0,22}$/

const Cups = () => {



  const { setCup } = useInfoCliente();
  const { setConsumosAnuales } = useContext(ConsumosAnualesContext)
  const [cups, setCups] = useState("");
  const [validCups, setValidCups] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [load, setLoad] = useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    setValidCups(CUPS_REGEX.test(cups))
  }, [cups])

  const handleContinue = async () => {
    setCup(cups)
    setLoad(true)
    try {
      const response = await axios.post("http://127.0.0.1:5000/cups", JSON.stringify({ cups }),
      {
        headers: { 'Content-Type': 'application/json' }
      })
      setLoad(false)
      const data = response.data
      console.log(data)
      
      if (data?.error) {
        setError(true)
      } else if (data?.Distribuidora) {
        setSuccess(true)
        setConsumosAnuales([data.ConsumoAnualP1, data.ConsumoAnualP2, data.ConsumoAnualP3])
      }
      
      setTimeout(() => {
        navigate("/client")
      }, 5000)

    } catch (err) {
      console.error(err.stack)
    }
    
  }

  return (
    <section id="cups-section">
      <FormCups cups={cups} load={load} setCups={setCups} />
      <div className="cup-notes-cnt">
        <div className="cup-notes">
          <p id="cupsnote" className={cups && !validCups ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
                El CUPS no puede ser mayor de 22 caracteres.
          </p>
          <p id="cupsnote" className={success ? "instructions-success" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
                Datos de consumo energéticos anuales cargados correctamente.
          </p>
          <p id="cupsnote" className={error ? "instructions-error" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
                Los datos no pudieron ser cargados. Por favor, introdúzcalos manualmente.
          </p>
        </div>
        <Link to="/client">No tengo el CUPS</Link>
      </div>
      <article className="navigation-sct-cups">
        <Link to="/home">
          <button className="back-btn">Atrás</button>
        </Link>
          <button disabled={!validCups || !cups ? true : false} className="continue-btn" onClick={handleContinue}>Continuar</button>
      </article>
      
      {/* {aquí no sé si va a vista a "/client" pero contemplando sin CUPS} */}
    </section>
  );
};

export default Cups;

>>>>>>> dev
