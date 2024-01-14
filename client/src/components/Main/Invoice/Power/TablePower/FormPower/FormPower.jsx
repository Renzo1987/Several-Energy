import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { usePowerContext } from "../../../../../../context/PowerProvider";
import { DataExtraContext } from "../../../../../../context/DataExtraProvider";

function createDataRow(franja, potenciaContratada, precioPotencia, descuento) {
  return { franja, potenciaContratada, precioPotencia, descuento };
}

function createDataTotales(franja, precioDescuento, totalPagoFactura, totalPagoAnual) {
  return { franja, precioDescuento, totalPagoFactura, totalPagoAnual };
}

const FormPower = () => {
  const { rowsPower, setRowsPower, rowsPowerTotales, setRowsPowerTotales } = usePowerContext();
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
          <Link to="/#">
            <button>Generar Ofertas</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FormPower;
