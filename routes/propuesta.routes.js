const express = require("express");
const propuestaController = require("../controllers/propuestaController");

const router = express.Router();

router.get("/propuesta", propuestaController.getAllPropuestas);
router.get("/propuesta/:id", propuestaController.getPropuestaById);
router.post("/propuesta", propuestaController.createPropuesta);
router.put("/propuesta/:id", propuestaController.updatePropuesta);
router.delete("/propuesta/:id", propuestaController.deletePropuesta);

module.exports = router;
