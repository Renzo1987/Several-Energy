import React from "react";
import { Link } from "react-router-dom";

const FormCups = ({ cups, setCups }) => {
  return (
    <form id="cups-form">
      <label>Escribir CUPS</label>
      <input
        type="text"
        value={cups}
        onChange={(e) => setCups(e.target.value)}
      />
      <Link to="/client">No tengo el CUPS</Link>
    </form>
  );
};

export default FormCups;
