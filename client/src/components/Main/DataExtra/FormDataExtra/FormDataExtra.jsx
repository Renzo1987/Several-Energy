import React from "react";
import { Link } from "react-router-dom";

const FormDataExtra = () => {
  return (
    <article id="data-extra-sct">
      <h5>Datos extra</h5>
      <section className="datos-extra-form">
        <div className="importe-energia">
          <div className="form-group">
            <label htmlFor="importeElectrico">Importe eléctrico</label>
            <input id="importeElectrico" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="energiaReactiva">Energía reactiva</label>
            <input id="energiaReactiva" type="text" />
          </div>
        </div>
        <div className="importe-energia">
          <div className="form-group">
            <label htmlFor="dias-facturación">Días de facturación</label>
            <input id="dias-facturación" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="alquiler-equipos">Alquiler de equipos</label>
            <input id="alquiler-equipos" type="text" />
          </div>
        </div>
        <div className="otros">
          <label htmlFor="otros">Otros</label>
          <input  type="text" placeholder="Concepto..." />
          <input  type="text" placeholder="Cantidad..." />
          <select name="otrosOpcion1">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <select name="otrosOpcion2" className="last-select">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="iva">
          <label htmlFor="iva">Iva</label>
          <select name="iva">
            <option value="21">21%</option>
            <option value="10">10%</option>
            <option value="5">5%</option>
          </select>
        </div>
      </section>
      <article className="navigation-sct">
        <Link to="/client">
          <button className="back-btn">Atrás</button>
        </Link>
        <Link to="/energy">
          <button  className="continue-btn">Continuar</button>
        </Link>
      </article>
    </article>
  );
};

export default FormDataExtra;
