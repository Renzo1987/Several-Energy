
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFranjasContext } from "../../../../../../context/FranjasProvider";
import ConsumosAnualesContext from "../../../../../../context/ConsumosAnualesProvider"; 

function createDataTotales(precioDescuento, totalPagoFactura, totalPagoAnual) {
  return { precioDescuento, totalPagoFactura, totalPagoAnual };
}

const FormEnergy = () => {

  const { rowsEnergy, setRowsEnergy, rowsEnergyTotales, setRowsEnergyTotales } = useFranjasContext();
  const { consumosAnuales } = useContext(ConsumosAnualesContext)
 

  const calculateTotals = (rowsEnergy) => {
    return rowsEnergy.map((row, index) => {
      let precioConDescuento = row.precioMesFacturacion * (1 - row.descuento / 100);
      let totalPagoFactura = row.consumoFacturaActual * precioConDescuento;
      let totalPagoAnual = consumosAnuales[index] * (row.precioMediaAnual * (1 - row.descuento / 100));
      return createDataTotales(precioConDescuento, totalPagoFactura, totalPagoAnual);
    });
  };

  useEffect(() => {
    const newTotalesRows = calculateTotals(rowsEnergy);
    setRowsEnergyTotales(newTotalesRows);
  }, [rowsEnergy, setRowsEnergyTotales]);

  const handleChange = (index, column, value) => {
    setRowsEnergy(prevRows => {
      const newRows = [...prevRows];
      const updatedRow = { ...newRows[index], [column]: value };
      newRows[index] = updatedRow;
      return newRows;
    });
  };


  return (
    <section id="energy-sct">
      <h5>Introducir datos del cliente</h5>
      <TableContainer className="table-energy">
        <Table>
          <TableHead>
            <TableRow className="table-row" sx={{ "& > *": { border: "unset", padding: "6px 10px" } }}>
              <TableCell className="table-cell">Franja</TableCell>
              <TableCell className="table-cell" align="center">
                Consumo anual 
              </TableCell>
              <TableCell className="table-cell" align="center">
                Consumo factura actual
              </TableCell>
              <TableCell className="table-cell" align="center">
                Precio media anual
              </TableCell>
              <TableCell className="table-cell" align="center">
                Precio mes de facturación
              </TableCell>
              <TableCell className="table-cell" align="center">
                Descuento
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsEnergy.map((row, index) => (
              <TableRow
                sx={{ "& > *": { border: "unset", padding: "6px 10px" } }}
                key={rowsEnergy.franja}
              >
                <TableCell component="th" scope="row">
                  {row.franja}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={ consumosAnuales[index] }
                    onChange={(e) =>
                      handleChange(index, "consumoAnual", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.consumoFacturaActual}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "consumoFacturaActual",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.precioMedioAnual}
                    onChange={(e) =>
                      handleChange(index, "precioMediaAnual", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.precioMesFacturacion}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "precioMesFacturacion",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    value={row.descuento}
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

      {/* tabla de totales*/}


      <div className="table-buttons">
      <h5>Totales (autocompletado)</h5>
        <TableContainer className="table-energy">
          <Table>
            <TableHead>
              <TableRow sx={{ "& > *": { border: "unset", padding: "6px 10px" } }}>
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
              {rowsEnergyTotales.map((row, index) => (
                <TableRow
                  sx={{ "& > *": { border: "unset", padding: "6px 10px" } }}
                  key={index}
                >
                  <TableCell component="th" scope="row">
                    P{index+1}
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.precioDescuento}
                      // onChange={(e) =>
                      //   handleTotalesChange(
                      //     index,
                      //     "precioDescuento",
                      //     e.target.value
                      //   )
                      // }
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.totalPagoFactura}
                      // onChange={(e) =>
                      //   handleTotalesChange(
                      //     index,
                      //     "totalPagoFactura",
                      //     e.target.value
                      //   )
                      // }
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.totalPagoAnual}
                      // onChange={(e) => {
                      //   handleTotalesChange(
                      //     index,
                      //     "totalPagoAnual",
                      //     e.target.value
                      //   )
                      // }
                      // }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       </div>
        <article className="navigation-sct">
          <Link to="/dataextra">
            <button className="back-btn">Atrás</button>
          </Link>
          <Link to="/power">
            <button className="continue-btn">Continuar</button>
          </Link>
        </article>
      </section>
    );
  };
export default FormEnergy;
