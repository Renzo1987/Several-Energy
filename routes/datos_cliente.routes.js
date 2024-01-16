const express = require('express');
const router = express.Router();
const datos_cliente_controller = require('../controllers/datos_cliente.controller');


router.get('/datoscliente/:id', datos_cliente_controller.getDatosClienteByIdController);
router.get('/datoscliente', datos_cliente_controller.getAllDatosClienteController);
router.post('/datoscliente', datos_cliente_controller.createDatosClienteController);
router.put('/datoscliente/:id', datos_cliente_controller.updateDatosClienteController);
router.delete('/datoscliente/:id', datos_cliente_controller.deleteDatosClienteController);

module.exports = router