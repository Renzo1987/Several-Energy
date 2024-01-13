import { useState } from "react";
import { Link } from "react-router-dom";
import { useInfoCliente } from "../../../../../context/InfoClienteProvider";
import axios from "axios";

const FormClient = () => {
  const [infoData, setInfoData] = useState({
    titular: "",
    direccion: "",
    comp_actual: "",
  });

  const { infoClienteState } = useInfoCliente();


  const postInfoCliente = async () => {
    const infoCliente = {
      ...infoData,
      cup: infoClienteState.cup,
      usuario_id: 1, 
    };
  
    try {
      const response = await axios.post( "http://localhost:3000/api/infocliente", infoCliente
      );
      console.log(response);
      navigate("/energy"); 
    } catch (error) {
      console.error("Hubo un error al enviar los datos", error);
    }
  };

  const handleChange = (event) => {
    setInfoData({ ...infoData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postInfoCliente();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titular"
        placeholder="Nombre y apellido"
        value={infoData.titular}
        onChange={handleChange}
        pattern="[a-zA-Z\s]+"
        title="Solo letras son permitidos."
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={infoData.direccion}
        onChange={handleChange}
        pattern="[a-zA-Z0-9\s]+"
        title="Solo letras y números son permitidos."
        required
      />
      <input
        type="text"
        name="comp_actual"
        placeholder="Compañía actual"
        value={infoData.comp_actual}
        onChange={handleChange}
        pattern="[a-zA-Z0-9\s]+"
        title="Solo letras y números son permitidos."
        required
      /> 
      <Link to="/energy">
      <button type="submit">Continuar</button>
      </Link>
    </form>
  );
};

export default FormClient;
