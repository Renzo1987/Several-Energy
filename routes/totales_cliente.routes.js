const express = require("express");
const totalesClienteController = require("../controllers/totalesClienteController"); 

const router = express.Router();

router.get("/totales", totalesClienteController.getAllTotalesCliente);
router.get("/totales/:id", totalesClienteController.getTotalesClienteById);
router.post("/totales", totalesClienteController.createTotalesCliente);
router.put("/totales/:id", totalesClienteController.updateTotalesCliente);
router.delete("/totales/:id", totalesClienteController.deleteTotalesCliente);

module.exports = router;
