const express = require('express');
const router = express.Router();
const info_cliente_controller = require('../controllers/info_cliente.controller');


router.get('/infocliente/:id', info_cliente_controller.getInfoClienteByIdController);
router.get('/infocliente', info_cliente_controller.getAllInfoClienteController);
router.get('/infocliente/obtenerasesor/:name', info_cliente_controller.getUserIDByClientName);
router.post('/infocliente', info_cliente_controller.createInfoClienteController);
router.put('/infocliente/:id', info_cliente_controller.updateInfoClienteController);
router.delete('/infocliente/:id', info_cliente_controller.deleteInfoClienteController);

module.exports = router