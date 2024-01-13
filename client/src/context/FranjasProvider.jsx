import React, { createContext, useContext, useState } from "react";

const FranjasContext = createContext();

export function FranjasProvider({ children }) {
  const [rows, setRows] = useState([
    { franja: "P1", consumoAnual: null, consumoFacturaActual: null, precioMediaAnual: null, precioMesFacturacion: null, descuento: null },
    { franja: "P2", consumoAnual: null, consumoFacturaActual: null, precioMediaAnual: null, precioMesFacturacion: null, descuento: null },
    { franja: "P3", consumoAnual: null, consumoFacturaActual: null, precioMediaAnual: null, precioMesFacturacion: null, descuento: null }
  ]);

  const [rowsTotales, setRowsTotales] = useState([
    { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null },
    { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null },
    { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null }
  ]);

  return (
    <FranjasContext.Provider value={{ rows, setRows, rowsTotales, setRowsTotales }}>
      {children}
    </FranjasContext.Provider>
  );
}

export function useFranjasContext() {
  return useContext(FranjasContext);
}

