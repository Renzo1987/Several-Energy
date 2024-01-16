import React, { createContext, useContext, useState } from "react";

const FranjasContext = createContext();

export function FranjasProvider({ children }) {
  const [rowsEnergy, setRowsEnergy] = useState([
    { franja: "P1", consumoAnual: null, consumoFacturaActual: null, precioMediaAnual: null, precioMesFacturacion: null, descuento: null },
    { franja: "P2", consumoAnual: null, consumoFacturaActual: null, precioMediaAnual: null, precioMesFacturacion: null, descuento: null },
    { franja: "P3", consumoAnual: null, consumoFacturaActual: null, precioMediaAnual: null, precioMesFacturacion: null, descuento: null }
  ]);

  const [rowsEnergyTotales, setRowsEnergyTotales] = useState([
    { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null },
    { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null },
    { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null }
  ]);

  return (
    <FranjasContext.Provider value={{ rowsEnergy, setRowsEnergy, rowsEnergyTotales, setRowsEnergyTotales }}>
      {children}
    </FranjasContext.Provider>
  );
}

export function useFranjasContext() {
  return useContext(FranjasContext);
}

