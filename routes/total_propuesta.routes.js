const express = require('express');
const router = express.Router();
const total_propuesta_controller = require('../controllers/info_cliente.controller');


router.get('/totalpropuesta/:id', total_propuesta_controller.getAllInfoClienteController);
router.get('/totalpropuesta/all', total_propuesta_controller.getInfoClienteByIdController);
router.post('/totalpropuesta', total_propuesta_controller.createInfoClienteController);
router.put('/totalpropuesta/:id', total_propuesta_controller.updateInfoClienteController);
router.delete('/totalpropuesta/:id', total_propuesta_controller.deleteInfoClienteController);

module.exports = router