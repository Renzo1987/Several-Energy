import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

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
  const rows = [
    createData("P1", "", "", "", "", ""),
    createData("P2", "", "", "", "", ""),
    createData("P3", "", "", "", "", ""),
  ];

  const rowsTotales = [
    createDataTotales("", "", ""),
    createDataTotales("", "", ""),
    createDataTotales("", "", ""),
  ];

  const [rowsData, setRowsData] = useState(rows);
  const [totalesRows, setTotalesRows] = useState(rowsTotales);

  const calculateTotals = (rows) => {
    return rows.map(row => {
      let precioConDescuento = row.precioMesFacturacion * (1 - row.descuento / 100);
      let totalPagoFactura = row.consumoFacturaActual * precioConDescuento;
      let totalPagoAnual = row.consumoAnual * (row.precioMediaAnual * (1 - row.descuento / 100));
      return createDataTotales(precioConDescuento, totalPagoFactura, totalPagoAnual);
    });
  };

  const handleChange = (index, column, value) => {
    const newRows = rowsData.map((row, i) => {
      if (i === index) {
        return { ...row, [column]: value };
      }
      return row;
    });
    setRowsData(newRows);
    setTotalesRows(calculateTotals(newRows))
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
            {rowsData.map((row, index) => (
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
              {totalesRows.map((row, index) => (
                <TableRow
                  sx={{ "& > *": { border: "unset", padding: "5px" } }}
                  key={index}
                >
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.precioDescuento}
                      onChange={(e) =>
                        handleTotalesChange(
                          index,
                          "precioDescuento",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.totalPagoFactura}
                      onChange={(e) =>
                        handleTotalesChange(
                          index,
                          "totalPagoFactura",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="table-cell" align="center">
                    <TextField
                      size="small"
                      value={row.totalPagoAnual}
                      onChange={(e) =>
                        handleTotalesChange(
                          index,
                          "totalPagoAnual",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div>
          <Button variant="contained" color="primary">
            Ver tabla completa
          </Button>
          <Link to="#">
          <Button variant="contained" color="secondary">
            Continuar
          </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormEnergy;
