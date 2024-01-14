import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { usePowerContext } from "../../../../../../context/PowerProvider";
import { useFranjasContext } from "../../../../../../context/FranjasProvider"; 
import { DataExtraContext } from "../../../../../../context/DataExtraProvider";

function createDataRow(franja, potenciaContratada, precioPotencia, descuento) {
  return { franja, potenciaContratada, precioPotencia, descuento };
}

function createDataTotales(franja, precioDescuento, totalPagoFactura, totalPagoAnual) {
  return { franja, precioDescuento, totalPagoFactura, totalPagoAnual };
}

const FormPower = () => {
  const { rowsPower, setRowsPower, rowsPowerTotales, setRowsPowerTotales } = usePowerContext();
  const { rowsEnergy, rowsEnergyTotales } = useFranjasContext();
  const { dataExtra } = useContext(DataExtraContext);

  const calculateTotals = (rowsPower) => {
    const totalsRows = rowsPower.map(row => {
      let precioConDescuento = row.precioPotencia * (1 - row.descuento / 100);
      let totalPagoFactura = row.potenciaContratada * precioConDescuento * row.numeroDiasFacturados;
      let totalPagoAnual = row.potenciaContratada * precioConDescuento * 365;
      return createDataTotales(row.franja, precioConDescuento, totalPagoFactura, totalPagoAnual);
    });
  
   
    totalsRows.push(createDataTotales("Total", 0, 0, 0));
  
 
    const totalPagoFactura = totalsRows.reduce((sum, row) => sum + (row.totalPagoFactura || 0), 0);
    const totalPagoAnual = totalsRows.reduce((sum, row) => sum + (row.totalPagoAnual || 0), 0);
  
   
    totalsRows[totalsRows.length - 1].totalPagoFactura = totalPagoFactura;
    totalsRows[totalsRows.length - 1].totalPagoAnual = totalPagoAnual;
  
    return totalsRows;
  };

  useEffect(() => {
    const newTotalesRows = calculateTotals(rowsPower, dataExtra.dias_facturacion);
    setRowsPowerTotales(newTotalesRows);
  }, [rowsPower, dataExtra.dias_facturacion]);

  const handleChange = (index, column, value) => {
    setRowsPower(prevRows => {
      const newRows = [...prevRows];
      const updatedRow = { ...newRows[index], [column]: value };
      newRows[index] = updatedRow;
      return newRows;
    });
  };




  const handleSubmit = async () => {
    const datosParaEnviar = rowsPower.map((rowPower, index) => {
      const energiaRow = rowsEnergy[index];
      const energiaTotalesRow = rowsEnergyTotales[index]; 
      return {
        info_id: 1,
        franja: rowPower.franja,
        con_anual: parseFloat(energiaRow.consumoAnual) || 0,
        con_fact_actual: parseFloat(energiaRow.consumoFacturaActual) || 0,
        pre_ener_act_me: parseFloat(energiaRow.precioMediaAnual) || 0,
        pre_ener_act_mes_fact: parseFloat(energiaRow.precioMesFacturacion) || 0,
        descuento_energia: parseFloat(energiaRow.descuento) || 0,
        pre_desc_energia: parseFloat(energiaTotalesRow.precioDescuento) || 0,
        total_pago_fact_energia: parseFloat(energiaTotalesRow.totalPagoFactura) || 0,
        total_pago_anual_energia: parseFloat(energiaTotalesRow.totalPagoAnual) || 0,
        pot_cont: parseFloat(rowPower.potenciaContratada) || 0,
        precio_pot: parseFloat(rowPower.precioPotencia) || 0,
        descuento_potencia: parseFloat(rowPower.descuento) || 0,
        pre_desc_pot: parseFloat(rowsPowerTotales.precioDescuento) || 0,
        total_pago_fact_potencia: parseFloat(rowsPowerTotales.totalPagoFactura) || 0,
        total_pago_anual_potencia: parseFloat(rowsPowerTotales.totalPagoAnual) || 0,
      };
    });
    
  
    try {
      const responses = await Promise.all(datosParaEnviar.map(franjaData =>
        axios.post('http://localhost:3000/api/franjas', franjaData)
      ));
      console.log('Todas las respuestas:', responses);
    } catch (error) {
      console.error("Hubo un error al enviar los datos:", error);
      if (error.response) {
        console.error("Datos de la respuesta:", error.response.data);
      }
    }
  };


  return (
    <>
      <TableContainer className="table-energy">
        <Table>
          <TableHead>
            <TableRow className="table-row">
              <TableCell className="table-cell">Franja</TableCell>
              <TableCell className="table-cell" align="center">
                Potencia contratada
              </TableCell>
              <TableCell className="table-cell" align="center">
                Precio Potencia
              </TableCell>
              <TableCell className="table-cell" align="center">
                Descuento %
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsPower.map((row, index) => (
              <TableRow
                sx={{ "& > *": { border: "unset", padding: "6px 10px" } }}
                key={row.franja}
              >
                <TableCell component="th" scope="row">
                  {row.franja}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.potenciaContratada ?? ""}
                    onChange={(e) =>
                      handleChange(index, "potenciaContratada", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.precioPotencia ?? ""}
                    onChange={(e) =>
                      handleChange(index, "precioPotencia", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.descuento ?? ""}
                    onChange={(e) =>
                      handleChange(index, "descuento", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* esto es para la tabla de totales*/}

      <div className="table-buttons">
        <TableContainer className="table-energy">
          <Table>
            <TableHead>
              <TableRow sx={{ "& > *": { border: "unset", padding: "5px" } }}>
                <TableCell className="table-cell" align="center">
                  Franja
                </TableCell>
                <TableCell className="table-cell" align="center">
                  Precio con descuento
                </TableCell>
                <TableCell className="table-cell" align="center">
                  Total pago factura
                </TableCell>
                <TableCell className="table-cell" align="center">
                  Total pago anual
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsPowerTotales.map((row, index) => (
                <TableRow
                  sx={{ "& > *": { border: "unset", padding: "5px" } }}
                  key={index}
                >
                  <TableCell className="table-cell" align="center">
                    {row.franja}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.precioDescuento ?? ""}
                      onChange={(e) =>
                        handleChange(index, "precioDescuento", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.totalPagoFactura ?? ""}
                      onChange={(e) =>
                        handleChange(index, "totalPagoFactura", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.totalPagoAnual ?? ""}
                      onChange={(e) =>
                        handleChange(index, "totalPagoAnual", e.target.value)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          <button>Ver tabla completa</button>
          <Link to="/proposal">
            <button onClick={handleSubmit}>Generar Ofertas</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormPower;
