import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "./FormPower.css";

const FormPower = () => {
  const numberParser = (params) => {
    const value = parseFloat(params.newValue);
    if (isNaN(value)) {
      return null;
    }
    return value;
  };

  const initialRows = [
    { franja: "P1", potenciaContratada: 0, precioPotencial: 0, descuento: 0, cellClass: "custom-cell" },
    { franja: "P2", potenciaContratada: 0, precioPotencial: 0, descuento: 0, cellClass: "custom-cell" },
    { franja: "Margen Fijo", potenciaContratada: 0, precioPotencial: 0, descuento: 0, cellClass: "custom-cell" },
  ];

  const [rowsData, setRowsData] = useState(
    initialRows.map((row) => ({
      ...row,
      potenciaContratada: null,
      precioPotencial: null,
      descuento: null,
      precioConDescuento: null,
      totalPagoFactura: null,
      totalPagoAnual: null,
    }))
  );

  const calculateTotals = (rows) => {
    return rows.map((row) => {
      const precioConDescuento = row.precioPotencial * (1 - row.descuento / 100);
      const totalPagoFactura = row.potenciaContratada * precioConDescuento;
      const totalPagoAnual = row.potenciaContratada * (row.precioPotencial * (1 - row.descuento / 100));
      return { ...row, precioConDescuento, totalPagoFactura, totalPagoAnual };
    });
  };

  const colDefs = [
    { headerName: "Franja", field: "franja", editable: false, cellClass: "custom-cell" },
    {
      headerName: "Potencia Contratada",
      field: "potenciaContratada",
      editable: true,
      cellClass: "custom-cell2",
      type: "numericColumn",
      valueParser: numberParser,
      onCellValueChanged: (event) => handleChange(event.rowIndex, "potenciaContratada", event.data.potenciaContratada),
    },
    {
      headerName: "Precio Potencial",
      field: "precioPotencial",
      editable: true,
      cellClass: "custom-cell3",
      type: "numericColumn",
      valueParser: numberParser,
      onCellValueChanged: (event) => handleChange(event.rowIndex, "precioPotencial", event.data.precioPotencial),
    },
    {
      headerName: "Descuento %",
      field: "descuento",
      editable: true,
      cellClass: "custom-cell2",
      type: "numericColumn",
      valueParser: numberParser,
      onCellValueChanged: (event) => handleChange(event.rowIndex, "descuento", event.data.descuento),
    },
  ];

  const colDefsSecondTable = [
    { headerName: "Precio con descuento", field: "precioConDescuento", editable: false, cellClass: "custom-cell2", type: "numericColumn" },
    { headerName: "Total pago factura", field: "totalPagoFactura", editable: false, cellClass: "custom-cell3", type: "numericColumn" },
    { headerName: "Total pago anual", field: "totalPagoAnual", editable: false, cellClass: "custom-cell2", type: "numericColumn" },
  ];

  const gridOptions = {};
  const gridApiRef = useRef(null);

  const handleChange = (index, column, value) => {
    const newRows = rowsData.map((row, i) => {
      if (i === index) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setRowsData(newRows);
  };

  const handleGridReady = (params) => {
    gridApiRef.current = params.api;
    params.api.addEventListener("rowDataChanged", () => {
      console.log("Row Data Changed");
    });
  };

  const handleVerTablaClick = () => {
    console.log("Botón ver tabla");
  };

  const handleContinuarClick = () => {
    console.log("Botón continuar");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="ag-theme-quartz" style={{ height: "176px", width: "800px", margin: "40px" }}>
        <AgGridReact rowData={rowsData} columnDefs={colDefs} gridOptions={gridOptions} onGridReady={handleGridReady} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px auto" }}>
        <div className="ag-theme-quartz" style={{ height: "170px", width: "600px" }}>
          <AgGridReact
            rowData={calculateTotals(rowsData).map((calculatedRow) => ({
              ...calculatedRow,
              precioConDescuento: calculatedRow.precioConDescuento !== null ? calculatedRow.precioConDescuento.toFixed(2) : null,
              totalPagoFactura: calculatedRow.totalPagoFactura !== null ? calculatedRow.totalPagoFactura.toFixed(2) : null,
              totalPagoAnual: calculatedRow.totalPagoAnual !== null ? calculatedRow.totalPagoAnual.toFixed(2) : null,
            }))}
            columnDefs={colDefsSecondTable}
            gridOptions={gridOptions}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
          <button onClick={handleVerTablaClick} className="button1">
            Ver Tabla Completa
          </button>
          <button onClick={handleContinuarClick} className="button2">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPower;
