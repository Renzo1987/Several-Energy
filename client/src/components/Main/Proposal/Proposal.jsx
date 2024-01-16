import { useEffect, useState } from "react";
import axios from 'axios'

const Proposal = () => {

  
  // const [preciosData, setPreciosData] = useState([])
  const [ciasData, setCiasData] = useState([])
  const [metodosData, setMetodosData] = useState([])
  const [productosCiasData, setProductosCiasData] = useState([])
  const [sistemasData, setSistemasData] = useState([])
  const [tarifasData, setTarifasData] = useState([])
  const [feeData, setFeeData] = useState([])
  const [mesData, setMesData] = useState([])

  const [ciasStringData, setCiasStringData] = useState("")
  const [metodosStringData, setMetodosStringData] = useState("")
  const [productosCiasStringData, setProductosCiasStringData] = useState("")
  const [sistemasStringData, setSistemasStringData] = useState("")
  const [tarifasStringData, setTarifasStringData] = useState("")
  const [feeStringData, setFeeStringData] = useState("")
  const [mesStringData, setMesStringData] = useState("")


  useEffect(() => {
    const obtenerFiltros = async () => {
      const response = await axios.get('http://127.0.0.1:5000/load_filters')
      
        setCiasData(response.data.cias)
        setMetodosData(response.data.metodos)
        // setPreciosData(response.data.precios)
        setProductosCiasData(response.data.producto_cia)
        setSistemasData(response.data.sistemas)
        setTarifasData(response.data.tarifas)
        setFeeData(response.data.fee)
        setMesData(response.data.mes || ["No hay datos mensuales"])
      
      // console.log(datos)
      
    }
    obtenerFiltros()
  }, [])

  const crearInputSistemas = () => {
    if (sistemasData) {
      const datosMapeados = sistemasData.map((value, i) => {
        return <option key={i} name="sistema" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }
  const crearInputTarifas = () => {
    if (tarifasData) {
      const datosMapeados = tarifasData.map((value, i) => {
        return <option key={i} name="tarifa" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }
  const crearInputCompañias = () => {
    if (ciasData) {
      const datosMapeados = ciasData.map((value, i) => {
        return <option key={i} name="cia" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }
  const crearInputMetodos = () => {
    if (metodosData) {
      const datosMapeados = metodosData.map((value, i) => {
        return <option key={i} name="metodo" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }
  const crearInputProductoCIA = () => {
    if (productosCiasData) {
      const datosMapeados = productosCiasData.map((value, i) => {
        return <option key={i} name="producto_cia" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }
  const crearInputMesFact = () => {
    if (mesData) {
      const datosMapeados = mesData.map((value, i) => {
        return <option key={i} name="mes_fact" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }
  const crearInputFEE = () => {
    if (feeData) {
      const datosMapeados = feeData.map((value, i) => {
        return <option key={i} name="fee" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="">No se cargaron los datos</option>
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.post(`http://127.0.0.1:5000/reload_filters?tarifa=${tarifasStringData}&cia=${ciasStringData}&metodo=${metodosStringData}`)
        setProductosCiasData(response.data.producto_cia) 
        // console.log(productosCiasData)
      }
    
    fetchData()
  }, [tarifasStringData, ciasStringData, metodosStringData])

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`${name}: ${value}`)

    switch (name) {
      case 'tarifa':
        setTarifasStringData(value);
        break;
      case 'metodo':
        setMetodosStringData(value);
        break;
      case 'compañia':
        setCiasStringData(value);
        break;
      case 'producto_cia':
        setProductosCiasStringData(value);
        break;
      case 'mes_fact':
        setMesStringData(value);
        break;
      case 'fee':
        setFeeStringData(value);
        break;
      case 'sistema':
        setSistemasStringData(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Generar oferta para el cliente</h1>
      <form className="proposal-form">
        <select name="sistema" id="sistema" onChange={handleChange}>
            <option value="" selected disabled>Sistemas</option>
            {crearInputSistemas()}
        </select>
        <select name="tarifa" id="tarifa" onChange={handleChange}>
            <option value="" selected disabled>Tarifas</option>
            {crearInputTarifas()} 
        </select>
        <select name="compañia" id="compañia" onChange={handleChange}>
            <option value="" selected disabled>Compañías</option>
            {crearInputCompañias()}  
        </select>
        <select name="metodo" id="metodo" onChange={handleChange}>
            <option value="" selected disabled>Métodos</option>
            {crearInputMetodos()}  
        </select>
        <select name="producto_cia" id="producto_cia" onChange={handleChange}>
           <option value="" selected disabled>Productos</option>
            {crearInputProductoCIA()}  
        </select>
        <select name="mes_fact" id="mes_fact" onChange={handleChange}>
            <option value="" selected disabled>Mes Facturación</option>
            {crearInputMesFact()}  
        </select>
        <select name="fee" id="fee" onChange={handleChange}>
            <option value="" selected disabled>Fee</option>
            {crearInputFEE()}
        </select>
      </form>
    </div>
  );
};

export default Proposal;
