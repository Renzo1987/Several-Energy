import React, { createContext, useContext, useReducer } from 'react';
import axios from "../api/axios";

const InfoClienteContext = createContext();

const SET_CUP = 'SET_CUP';
const SET_CLIENT_DATA = 'SET_CLIENT_DATA';

const infoClienteReducer = (infoClienteState, action) => {
  switch (action.type) {
    case SET_CUP:
      return {
        ...infoClienteState,
        cup: action.payload,
      };
    case SET_CLIENT_DATA:
      return {
        ...infoClienteState,
        clientData: action.payload,
      };
    default:
      return infoClienteState;
  }
};

const InfoClienteProvider = ({ children }) => {
  const [infoClienteState, updateInfoClienteState] = useReducer(infoClienteReducer, {
    cup: '',
    clientData: {
      info_id: '',
      usuario_id: '',
      direccion: '',
      comp_actual: '',
    },
  });

  const setCup = (cup) => {
    updateInfoClienteState({ type: SET_CUP, payload: cup });
  };

  const setClientData = (newClientData) => {
    updateInfoClienteState({ type: SET_CLIENT_DATA, payload: newClientData });
  };
  

  const createInfoCliente = async (usuario_id, titular, direccion, cup, comp_actual) => {
    try {
      const response = await axios.post('/infocliente', {
        usuario_id,
        titular,
        direccion,
        cup,
        comp_actual,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getInfoCliente = async () => {
    try {

      const response = await axios.get('/infocliente/');

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateInfoCliente = async (info_id, usuario_id, titular, direccion, cup, comp_actual) => {
    try {
      const response = await axios.put(`/infocliente/${info_id}`, {
        usuario_id,
        titular,
        direccion,
        cup,
        comp_actual,
      });
      return response.data;    
    } catch (error) {
      throw error;
    }
  };

  const deleteInfoCliente = async (info_id) => {
    try {
      const response = await axios.delete(`/infocliente/${info_id}`);
      return response.data;      
    } catch (error) {
      throw error;
    }
  };

  return (
    <InfoClienteContext.Provider
      value={{
        infoClienteState,
        setCup,
        setClientData,
        createInfoCliente,
        getInfoCliente,
        updateInfoCliente,
        deleteInfoCliente,
      }}
    >
      {children}
    </InfoClienteContext.Provider>
  );
};

const useInfoCliente = () => {
  const context = useContext(InfoClienteContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};


export { InfoClienteProvider, useInfoCliente };

