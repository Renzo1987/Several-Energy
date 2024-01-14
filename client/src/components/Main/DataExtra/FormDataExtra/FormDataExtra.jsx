import React from "react";

const FormDataExtra = () => {
  return (
    <>
      <section className="datos-extra-form">
        <div className="form-group">
          <label htmlFor="importeElectrico">Importe eléctrico</label>
          <input id="importeElectrico" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="energiaReactiva">Energía reactiva</label>
          <input id="energiaReactiva" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="otros1">Otros</label>
          <input  type="text" placeholder="concepto" />
          <input  type="text" placeholder="cantidad" />
          <select name="otrosOpcion1">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <select name="otrosOpcion2">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <label htmlFor="otros1">Otros</label>
          <input  type="text" placeholder="concepto" />
          <input  type="text" placeholder="cantidad" />
          <select name="otrosOpcion1">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
          <select name="otrosOpcion2">
            <option value="si">Sí</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="diasFacturacion">Días de facturación</label>
          <input id="diasFacturacion" type="text" />
        </div>
      </section>
      <div className="datos-extra-footer">
        <div className="form-group">
          <label htmlFor="iva">Iva</label>
          <select name="iva">
            <option value="21">21%</option>
            <option value="10">10%</option>
            <option value="5">5%</option>
          </select>
        </div>
        <button>Ver tabla completa</button>
        <button>Atrás</button>
        <button>Generar ofertas</button>
      </div>
    </>
  );
};

export default FormDataExtra;
