const express = require("express");
const session = require("express-session");
const morgan = require("./middlewares/morgan");
const cors = require("cors");
const corsOptions = require("./config/cors_options");
const path = require("path");
const app = express();
const PORT = 3000;
const usersRoutes = require("./routes/users.routes");
const datos_clienteRoutes = require("./routes/datos_cliente.routes");
const info_clienteRoutes = require("./routes/info_cliente.routes");
const total_propuestaRoutes = require("./routes/total_propuesta.routes");

const franjasUserRoutes = require("./routes/franja_cliente.routes");
const propuestaRoutes = require("./routes/propuesta.routes");
const totales_clienteRoutes = require("./routes/totales_cliente.routes");

app.use(morgan(":method :host :status :param[id] - :response-time ms :body"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cross Origin Resource Sharing
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Routes
app.use("/api/", usersRoutes);
app.use("/api/", datos_clienteRoutes);
app.use("/api/", info_clienteRoutes);
app.use("/api/", total_propuestaRoutes);
app.use("/api/", franjasUserRoutes);
app.use("/api/", propuestaRoutes);
app.use("/api/", totales_clienteRoutes);

app.all("*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(PORT, () => {
  console.log(`>Listening on port: http://localhost:${PORT}`);
});
