import { useEffect, useContext } from "react";
import { usePowerContext } from "../../../context/PowerProvider";
import { useFranjasContext } from "../../../context/FranjasProvider";
import { DataExtraContext } from "../../../context/DataExtraProvider";
import ConsumosAnualesContext from "../../../context/ConsumosAnualesProvider";
import { useInfoCliente } from "../../../context/InfoClienteProvider";
import {
  FormControl,
  Select,
  MenuItem,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";

const Proposal = () => {
  const { consumosAnuales } = useContext(ConsumosAnualesContext);
  const { rowsPower, setRowsPower, rowsPowerTotales } = usePowerContext();
  const { rowsEnergy, rowsEnergyTotales } = useFranjasContext();
  const { dataExtra } = useContext(DataExtraContext);
  const { infoClienteState } = useInfoCliente();

  const infoId = infoClienteState.clientData.info_id;
  const totalConsumoAnual = consumosAnuales.reduce((acc, val) => acc + val, 0);
  const totalEnergia = rowsEnergyTotales[rowsEnergyTotales.length - 1];
  const totalPotencia = rowsPowerTotales[rowsPowerTotales.length - 1];

  console.log(totalConsumoAnual);
  console.log(totalEnergia);
  console.log(totalPotencia);

  useEffect(() => {
    const obtenerFiltros = async () => {
      const response = await axios.get("http://127.0.0.1:5000/load_filters");
      console.log(response.data);
    };

    obtenerFiltros();
  }, []);

  const titleStyle = {
    fontSize: "0.8rem",
  };

  const contentStyle = {
    fontSize: "0.8rem",
  };

  const handlePostData = async () => {
    const infoId = infoClienteState.clientData.info_id;
    const totalConsumoAnual = consumosAnuales.reduce(
      (acc, val) => acc + val,
      0
    );
    const totalEnergia = rowsEnergyTotales[rowsEnergyTotales.length - 1];
    const totalPotencia = rowsPowerTotales[rowsPowerTotales.length - 1];
    const otrosAnual =
      (parseFloat(dataExtra.otros_1 + dataExtra.otros_2) / diasFacturacion) *
      365;
    const alquilerEquipoAnual =
      (parseFloat(dataExtra.alquiler_equipo) / diasFacturacion) * 365;

    const ivaDecimal = parseFloat(dataExtra.iva) / 100;

    const importeTotalFactura =
      (parseFloat(totalEnergia.totalPagoFactura) +
        parseFloat(totalPotencia.totalPagoFactura) +
        parseFloat(dataExtra.energia_reactiva) +
        parseFloat(dataExtra.impuesto_electrico) +
        parseFloat(dataExtra.otros_1) +
        parseFloat(dataExtra.otros_2) +
        parseFloat(dataExtra.alquiler_equipo)) *
      (1 + ivaDecimal);

    const totalAnualEstimado =
      ((parseFloat(totalEnergia.totalPagoAnual) +
        parseFloat(totalPotencia.totalPagoAnual)) *
        1.0051127 +
        alquilerEquipoAnual +
        otrosAnual) *
      (1 + ivaDecimal);

    const totalesData = {
      info_id: infoId,
      t_con_anual: totalConsumoAnual,
      t_con_fact_actual: totalEnergia.consumoFacturaActual,
      t_pago_fact_energia: totalEnergia.totalPagoFactura,
      t_pago_anual_energia: totalEnergia.totalPagoAnual,
      t_pago_fact_potencia: totalPotencia.totalPagoFactura,
      t_pago_anual_potencia: totalPotencia.totalPagoAnual,
      importe_total_factura: importeTotalFactura,
      total_anual_estimado: totalAnualEstimado      
    };

    try {
      const response = await axios.post("api/totales", totalesData);
      console.log("Datos enviados correctamente", response.data);
    } catch (error) {
      console.error("Hubo un error al enviar los datos:", error);
    }
  };

  return (
    <div>
      <h1>Generar oferta para el cliente</h1>

      <form>
        <Grid container spacing={2}>
          <Grid container item xs={7} spacing={1}>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Tipo de sistema
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Tarifa
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Compañía
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Método
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Producto CIA (POT)
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Mes facturación
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                FEE (energía)
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={8} spacing={2}>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <Select style={contentStyle}>
                  <MenuItem value="x1">x</MenuItem>
                  <MenuItem value="x2">x</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container item xs={8} spacing={1}>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Ahorro factura anual
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1" style={titleStyle}>
                Ahorro anual
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={8} spacing={2}>
            <Grid item xs={2}>
              <TextField style={{ ...contentStyle, width: "100%" }} />
            </Grid>
            <Grid item xs={2}>
              <TextField style={{ ...contentStyle, width: "100%" }} />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => console.log("")}>Atrás</Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => console.log("")}>Generar PDF</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Proposal;
