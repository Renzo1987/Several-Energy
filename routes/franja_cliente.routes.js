const express = require("express");
const franjasUserController = require("../controllers/franjasController");

const router = express.Router();

router.get("/franjas/all", franjasUserController.getAllFranjasCliente);
router.get("/franjas/:id", franjasUserController.getFranjasClienteById);
router.post("/franjas", franjasUserController.createFranjasCliente);
router.put("/franjas/:id", franjasUserController.updateFranjasCliente);
router.delete("/franjas/:id", franjasUserController.deleteFranjasCliente);

module.exports = router;
