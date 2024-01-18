<<<<<<< HEAD
import React, { createContext, useContext, useReducer } from 'react';
import axios from "../api/axios";

const InfoClienteContext = createContext();

const SET_CUP = 'SET_CUP';
const SET_CLIENT_DATA = 'SET_CLIENT_DATA';
const SET_INFO_ID = 'SET_INFO_ID';
const SET_TITULAR_DIRECCION_CIA = 'SET_TITULAR_DOMICILIO_CIA';


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
      case SET_INFO_ID:
        return {
          ...infoClienteState,
          clientData: {
            ...infoClienteState.clientData,
            info_id: action.payload,
          },
        };
        case SET_TITULAR_DIRECCION_CIA:
        return {
          ...infoClienteState,
          clientData: {
            ...infoClienteState.clientData,
            titular: action.payload.titular,
            direccion: action.payload.direccion,
            comp_actual:action.payload.comp_actual
          },
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

  const setInfoId = (infoId) => {
    updateInfoClienteState({ type: SET_INFO_ID, payload: infoId });
  };
  const setTitularDireccionCia = (titular, direccion, comp_actual) => {
    updateInfoClienteState({ type: SET_TITULAR_DIRECCION_CIA, payload: { titular, direccion, comp_actual } });
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
        setInfoId,
        setTitularDireccionCia,
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

=======
import React, { createContext, useContext, useReducer } from 'react';
import axios from "../api/axios";

const InfoClienteContext = createContext();

const SET_CUP = 'SET_CUP';
const SET_CLIENT_DATA = 'SET_CLIENT_DATA';
const SET_INFO_ID = 'SET_INFO_ID';
const SET_TITULAR_DIRECCION_CIA = 'SET_TITULAR_DOMICILIO_CIA';


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
      case SET_INFO_ID:
        return {
          ...infoClienteState,
          clientData: {
            ...infoClienteState.clientData,
            info_id: action.payload,
          },
        };
        case SET_TITULAR_DIRECCION_CIA:
        return {
          ...infoClienteState,
          clientData: {
            ...infoClienteState.clientData,
            titular: action.payload.titular,
            direccion: action.payload.direccion,
            comp_actual:action.payload.comp_actual
          },
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

  const setInfoId = (infoId) => {
    updateInfoClienteState({ type: SET_INFO_ID, payload: infoId });
  };
  const setTitularDireccionCia = (titular, direccion, comp_actual) => {
    updateInfoClienteState({ type: SET_TITULAR_DIRECCION_CIA, payload: { titular, direccion, comp_actual } });
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
        setInfoId,
        setTitularDireccionCia,
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

>>>>>>> dev
