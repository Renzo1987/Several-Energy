import { useState, useContext } from "react";
import axios from "../../../../../api/axios";
import { useNavigate } from "react-router-dom";
import { useInfoCliente } from "../../../../../context/InfoClienteProvider";

const FormClient = () => {
  const [infoData, setInfoData] = useState({
    titular: "",
    direccion: "",
    comp_actual: "",
  });

  const { infoClienteState, createInfoCliente } = useInfoCliente();

  const navigate = useNavigate();

  const postInfoCliente = async () => {
    const infoCliente = {
      ...infoData,
      cups: infoClienteState.cup,
      usuario_id: "", //pendiente authprovider?
    };

    try {
      const response = await axios.post(
        "/api/infocliente",
        createInfoCliente(
          infoCliente.usuario_id,
          infoCliente.titular,
          infoCliente.direccion,
          infoCliente.cups,
          infoCliente.comp_actual
        )
      );
      console.log(response.data);
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
      <button type="submit">Continuar</button>
    </form>
  );
};

export default FormClient;
