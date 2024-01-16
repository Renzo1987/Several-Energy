
import React, { createContext, useState } from 'react';

import axios from 'axios';

export const DataExtraContext = createContext();

export const DataExtraProvider = ({ children }) => {
  const [dataExtra, setDataExtra] = useState({
    info_id: 1,
    dias_facturacion: 30,
    energia_reactiva: 0,
    impuesto_electrico: 0,
    alquiler_equipo: 0,
    otros_1: 0,
    otros_2: 0,
    iva: 21,
  });

 

  return (
    <DataExtraContext.Provider value={{ dataExtra, setDataExtra }}>
      {children}
    </DataExtraContext.Provider>
  );
};
