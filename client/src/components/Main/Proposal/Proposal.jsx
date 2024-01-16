import { useEffect } from "react";
import { FormControl, Select, MenuItem, TextField, Grid, Typography, Button } from "@mui/material";
import axios from 'axios'

const Proposal = () => {

  useEffect(() => {
    const obtenerFiltros = async () => {
      const response = await axios.get('http://127.0.0.1:5000/load_filters')
      console.log(response.data)
    }

    obtenerFiltros()
  }, [])

  const titleStyle = {
    fontSize: "0.8rem",
  };

  const contentStyle = {
    fontSize: "0.8rem",
  };

  return (
    <div>
      <h1>Generar oferta para el cliente</h1>

      <form>
        <Grid container spacing={2} justifyContent="center">
          <Grid container item xs={8} spacing={1}>
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
              <Button onClick={() => console.log("")}>
                Atrás
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => console.log("")}>
                Generar PDF
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Proposal;
