
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFranjasContext } from "../../../../../../context/FranjasProvider"; 


function createData(
  franja,
  consumoAnual,
  consumoFacturaActual,
  precioMediaAnual,
  precioMesFacturacion,
  descuento
) {
  return {
    franja,
    consumoAnual,
    consumoFacturaActual,
    precioMediaAnual,
    precioMesFacturacion,
    descuento,
  };
}

function createDataTotales(precioDescuento, totalPagoFactura, totalPagoAnual) {
  return { precioDescuento, totalPagoFactura, totalPagoAnual };
}

const FormEnergy = () => {

  const { rows, setRows, rowsTotales, setRowsTotales } = useFranjasContext();



 

  const calculateTotals = (rows) => {
    return rows.map(row => {
      let precioConDescuento = row.precioMesFacturacion * (1 - row.descuento / 100);
      let totalPagoFactura = row.consumoFacturaActual * precioConDescuento;
      let totalPagoAnual = row.consumoAnual * (row.precioMediaAnual * (1 - row.descuento / 100));
      return createDataTotales(precioConDescuento, totalPagoFactura, totalPagoAnual);
    });
  };

  useEffect(() => {
    const newTotalesRows = calculateTotals(rows);
    setRowsTotales(newTotalesRows);
  }, [rows, setRowsTotales]);

  const handleChange = (index, column, value) => {
    setRows(prevRows => {
      const newRows = [...prevRows];
      const updatedRow = { ...newRows[index], [column]: value };
      newRows[index] = updatedRow;
      return newRows;
    });
  };


  return (
    <>
      <TableContainer className="table-energy">
        <Table>
          <TableHead>
            <TableRow className="table-row">
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
            {rows.map((row, index) => (
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
                    value={row.consumoAnual}
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
        <TableContainer className="table-energy">
          <Table>
            <TableHead>
              <TableRow sx={{ "& > *": { border: "unset", padding: "5px" } }}>
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
              {rowsTotales.map((row, index) => (
                <TableRow
                  sx={{ "& > *": { border: "unset", padding: "5px" } }}
                  key={index}
                >
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
                      // onChange={(e) =>
                      //   handleTotalesChange(
                      //     index,
                      //     "totalPagoAnual",
                      //     e.target.value
                      //   )
                      // }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          <div>
            <button>Ver tabla completa</button>
            <Link to="/power">
              <button >Continuar</button>
            </Link>
          </div>
        </div>
      </>
    );
  };
export default FormEnergy;
