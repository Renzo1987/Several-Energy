import { useEffect, useState, useContext } from "react";
import  { Link } from 'react-router-dom'
import axios from 'axios'
import ConsumosAnualesContext from '../../../context/ConsumosAnualesProvider'
import { usePowerContext } from "../../../context/PowerProvider";
import { useFranjasContext } from "../../../context/FranjasProvider";
import { DataExtraContext } from "../../../context/DataExtraProvider";
import { useInfoCliente } from "../../../context/InfoClienteProvider";


const Proposal = () => {

  const { consumosAnuales } = useContext(ConsumosAnualesContext);
  const { rowsPower, setRowsPower, rowsPowerTotales } = usePowerContext();
  const { rowsEnergy, rowsEnergyTotales } = useFranjasContext();
  const { dataExtra } = useContext(DataExtraContext);
  const { infoClienteState } = useInfoCliente();

  const [preciosData, setPreciosData] = useState([])
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
      return  <option value="-">No se cargaron los datos</option>
    }
  }
  const crearInputMetodos = () => {
    if (metodosData) {
      const datosMapeados = metodosData.map((value, i) => {
        return <option key={i} name="metodo" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="-">No se cargaron los datos</option>
    }
  }
  const crearInputProductoCIA = () => {
    if (productosCiasData) {
      const datosMapeados = productosCiasData.map((value, i) => {
        return <option key={i} name="producto_cia" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="-">No se cargaron los datos</option>
    }
  }
  const crearInputMesFact = () => {
    if (mesData) {
      const datosMapeados = mesData.map((value, i) => {
        return <option key={i} name="mes_fact" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="-">No se cargaron los datos</option>
    }
  }
  const crearInputFEE = () => {
    if (feeData) {
      const datosMapeados = feeData.map((value, i) => {
        return <option key={i} name="fee" value={value}>{value}</option>})
        return datosMapeados
    } else {
      return  <option value="-">No se cargaron los datos</option>
    }
  }

  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.post(`http://127.0.0.1:5000/reload_filters?tarifa=${tarifasStringData}&cia=${ciasStringData}&metodo=${metodosStringData}`)
        console.log(response.data)
        setProductosCiasData(response.data.producto_cia) 
        setFeeData(response.data.fee) 
        setMesData(response.data.meses) 
        setCiasData(response.data.cia)

        const responsePrecios = await axios.post(`http://127.0.0.1:5000/cargar_precios?tarifa=${tarifasStringData}&cia=${ciasStringData}&metodo=${metodosStringData}&sistema=${sistemasStringData}&producto_cia=${productosCiasStringData}&mes=${mesStringData}&fee=${feeStringData}`)
        console.log(responsePrecios.data.precios)
        setPreciosData(responsePrecios.data.precios)
      }
    fetchData()
  }, [tarifasStringData, ciasStringData, metodosStringData, productosCiasStringData, mesStringData, feeStringData])

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


  const handlePostData = async () => {
    const infoId = infoClienteState.clientData.info_id;
  
    const totalConsumoAnual = consumosAnuales.reduce((acc, val) => acc + val, 0);
    const totalEnergia = rowsEnergyTotales[rowsEnergyTotales.length - 1];
    const totalPotencia = rowsPowerTotales[rowsPowerTotales.length - 1];
  
    const otrosAnual =(parseFloat(dataExtra.otros_1 + dataExtra.otros_2) / dataExtra.diasFacturacion) * 365;
    const alquilerEquipoAnual = (parseFloat(dataExtra.alquiler_equipo) / dataExtra.diasFacturacion) * 365;
    const ivaDecimal = parseFloat(dataExtra.iva) / 100;
  
    const importeTotalFactura = (parseFloat(totalEnergia.totalPagoFactura) +
        parseFloat(totalPotencia.totalPagoFactura) +
        parseFloat(dataExtra.energia_reactiva) +
        parseFloat(dataExtra.impuesto_electrico) +
        parseFloat(dataExtra.otros_1) + parseFloat(dataExtra.otros_2) + parseFloat(dataExtra.alquiler_equipo)) * (1 + ivaDecimal);
  
    const totalAnualEstimado =
      ((parseFloat(totalEnergia.totalPagoAnual) +
        parseFloat(totalPotencia.totalPagoAnual)) *
        1.0051127 +
        alquilerEquipoAnual +
        otrosAnual) *
      (1 + ivaDecimal);
  
    console.log(preciosData)

    
    
    //CALCULO FACTURA ENERGIA 


    const precioDescuentoEnergiaP1 = preciosData[0].P1 * (1 - rowsEnergy[0].descuento / 100)
    const precioDescuentoEnergiaP2 = preciosData[0].P2 *  (1 - rowsEnergy[1].descuento / 100)
    const precioDescuentoEnergiaP3 = preciosData[0].P3 * (1 - rowsEnergy[2].descuento / 100)

    const totPagoEnergiaFactP1= rowsEnergy[0].consumoFacturaActual * precioDescuentoEnergiaP1
    const totPagoEnergiaFactP2=rowsEnergy[1].consumoFacturaActual * precioDescuentoEnergiaP2
    const totPagoEnergiaFactP3=rowsEnergy[2].consumoFacturaActual * precioDescuentoEnergiaP3

    const totConsumoFacturaEn = rowsEnergy[0].consumoFacturaActual + rowsEnergy[1].consumoFacturaActual +rowsEnergy[2].consumoFacturaActual
    const totPagoEnergiaFact = totPagoEnergiaFactP1 + totPagoEnergiaFactP2 + totPagoEnergiaFactP3

    const totPagoEnergiaAnualP1 = rowsEnergy[0].consumoFacturaActual * preciosData[0].P1 * (1 - rowsEnergy[0].descuento / 100);
    const totPagoEnergiaAnualP2 = rowsEnergy[1].consumoFacturaActual * preciosData[0].P1 * (1 - rowsEnergy[0].descuento / 100);
    const totPagoEnergiaAnualP3 = rowsEnergy[2].consumoFacturaActual * (1 - rowsEnergy[0].descuento / 100);

    const totPagoEnergiaAnual = totConsumoFacturaEn * preciosData[0].P1 * (1 - rowsEnergy[0].descuento / 100);



    //CALCULO FACTURA ENERGIA 

    const precioDescuentoPotenciaP1 = preciosData[0].p1 * (1 - rowsPower[0].descuento / 100)
    const precioDescuentoPotenciaP2 = preciosData[0].p2 *  (1 - rowsPower[1].descuento / 100)

    const totPagoPotenciaFactP1= rowsPower[0].consumoFacturaActual * precioDescuentoPotenciaP1
    const totPagoPotenciaFactP2=rowsPower[1].consumoFacturaActual * precioDescuentoPotenciaP2

    const totConsumoFacturaPot = rowsPower[0].consumoFacturaActual + rowsPower[1].consumoFacturaActual
    const totPagoPotenciaFact = (totPagoPotenciaFactP1 + totPagoPotenciaFactP2) * dataExtra.diasFacturacion
    const totPagoAnualPotencia = totConsumoFacturaPot * 365




    // //AHORRO
    // Importe total factura: (Total pago en factura (Energía) + Total pago en factura (Potencia) + Energía reactiva + impuesto eléctrico + Otros + Alquiler de equipo) * (1 + IVA) 
    // Total anual estimado: {[Total pago anual (Energía) + Total pago anual (Potencia)] * 1.0051127 + [(Alquiler de equipo / días de facturación) * 365] + [(Otros / días facturados) * 365]} * (1 + IVA)
    
    

    const totalesClienteData = {
      info_id: infoId,
      t_con_anual: totalConsumoAnual,
      t_con_fact_actual: totalEnergia.consumoFacturaActual,
      t_pago_fact_energia: totalEnergia.totalPagoFactura,
      t_pago_anual_energia: totalEnergia.totalPagoAnual,
      t_pago_fact_potencia: totalPotencia.totalPagoFactura,
      t_pago_anual_potencia: totalPotencia.totalPagoAnual,
      importe_total_factura: importeTotalFactura,
      total_anual_estimado: totalAnualEstimado,
    };
  
    const propuestaData = [
      {
        info_id: infoId,
        franja: "P1",
        total_pago_fact_energia:totPagoEnergiaFactP1,
        total_pago_anual_energia: totPagoEnergiaAnualP1,
        total_pago_fact_potencia:totPagoPotenciaFactP1,
        total_pago_anual_potencia: 0.0,
      },
      {
        info_id: infoId,
        franja: "P2",
        total_pago_fact_energia: totPagoEnergiaFactP2,
        total_pago_anual_energia: totPagoEnergiaAnualP2,
        total_pago_fact_potencia: totPagoPotenciaFactP2,
        total_pago_anual_potencia: totPagoAnualPotencia,
      },
  
      {
        info_id: infoId,
        franja: "P3",
        total_pago_fact_energia: totPagoEnergiaFactP3,
        total_pago_anual_energia: totPagoEnergiaAnualP3,
        total_pago_fact_potencia: 0.0,
        total_pago_anual_potencia: 0.0,
      },
    ];
  
    const totalPropuestaData = {
      info_id: infoId,
      t_con_anual: totConsumoFacturaEn,
      t_con_fact_actual: totConsumoFacturaPot,
      t_pago_fact_energia: totPagoEnergiaFact,
      t_pago_anual_energia:totPagoEnergiaAnual,
      t_pago_fact_potencia: totPagoPotenciaFact,
      t_pago_anual_potencia: 0.0,
      importe_total_factura: 0.0,
      total_anual_estimado: 0.0,
      ahorro_fact_actual: 0,
      ahorro_anual: 0,
    };
  
    const postTotales = async (data) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/totales",
          data
        );
        console.log("Totales enviados:", response.data);
      } catch (error) {
        console.error("Error en envío de totales:", error);
      }
    };
  
    const enviarPropuestas = async (data) => {
      try {
        const responses = await Promise.all(
          propuestaData.map((propuesta) =>
            axios.post("http://localhost:3000/api/propuesta", propuesta)
          )
        );
        console.log(
          "Propuestas enviadas:",
          responses.map((res) => res.data)
        );
        return responses.map((res) => res.data); 
      } catch (error) {
        console.error("Error en envío de propuestas:", error);
        throw error; 
      }
    };
  
    const postTotalPropuesta = async (data) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/totalpropuesta",
          data
        );
        console.log("Total propuesta enviado:", response.data);
      } catch (error) {
        console.error("Error en envío de total propuesta:", error);
      }
    };
  
    try {
      const resultadosTotales = await postTotales(totalesClienteData);
      const resultadosPropuestas = await enviarPropuestas(propuestaData);
      const resultadoTotalPropuesta = await postTotalPropuesta(totalPropuestaData);
  
      console.log("Todos los datos han sido enviados correctamente", {
        resultadosTotales,
        resultadosPropuestas,
        resultadoTotalPropuesta,
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <>
      <section className="proposal-sct">
        <h5>Generar oferta para el cliente</h5>
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
      </section>
      <section className="final-offer-nvg">
        <article className="final-offer">
            <div className="ahorro-card">
              <h5>Ahorro Factura Actual</h5>
              <div className="info-ahorro">
                <span className="porcentaje">2%</span>
                <span className="total">-20,51 €</span>
              </div>
            </div>
            <div className="ahorro-card">
              <h5>Ahorro Anual</h5>
              <div className="info-ahorro">
                <span className="porcentaje">12%</span>
                <span className="total">-20,51 €</span>
              </div>
            </div>
        </article>
        <article className="navigation-sct">
          <Link to="/power">
            <button className="back-btn">Atrás</button>
          </Link>
            <button className="continue-btn" onClick={handlePostData}>Generar PDF</button>
        </article>
      </section>
    </>
  );
};

export default Proposal;
