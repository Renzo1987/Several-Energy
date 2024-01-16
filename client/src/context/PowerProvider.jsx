import React, { createContext, useContext, useState } from "react";

const PowerContext = createContext();

export function PowerProvider({ children }) {
    const initialPowerRows = [
      { franja: "P1", potenciaContratada: null, precioPotencia: null, descuento: null, numeroDiasFacturados: null },
      { franja: "P2", potenciaContratada: null, precioPotencia: null, descuento: null, numeroDiasFacturados: null },
      { franja: "P3", potenciaContratada: null, precioPotencia: null, descuento: null, numeroDiasFacturados: null }
    ];
  
    const initialPowerTotalesRows = [
      { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null },
      { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null },
      { precioDescuento: null, totalPagoFactura: null, totalPagoAnual: null }
    ];
  
    const [rowsPower, setRowsPower] = useState(initialPowerRows);
  
    const [rowsPowerTotales, setRowsPowerTotales] = useState(initialPowerTotalesRows);
  
    return (
      <PowerContext.Provider value={{ rowsPower, setRowsPower, rowsPowerTotales, setRowsPowerTotales }}>
        {children}
      </PowerContext.Provider>
    );
  }

export function usePowerContext() {
  return useContext(PowerContext);
}
