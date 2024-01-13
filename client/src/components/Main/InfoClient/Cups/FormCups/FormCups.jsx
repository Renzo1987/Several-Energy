import React from "react";

const FormCups = ({ cups, setCups }) => {
  return (
    <form>
      <label>Escribir CUPS</label>
      <input
        type="text"
        value={cups}
        onChange={(e) => setCups(e.target.value)}
      />
    </form>
  );
};

export default FormCups;
