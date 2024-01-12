const express = require("express");
const session = require("express-session");
const morgan = require("./middlewares/morgan");
const cors = require("cors");
const corsOptions = require("./config/cors_options");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const usersRoutes = require("./routes/users.routes");
const franjasUserRoutes = require("./routes/franja_cliente.routes");

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

app.all("*", (req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(PORT, () => {
  console.log(`>Listening on port: http://localhost:${PORT}`);
});
