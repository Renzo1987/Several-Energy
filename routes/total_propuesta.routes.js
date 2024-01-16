const express = require('express');
const router = express.Router();
const total_propuesta_controller = require('../controllers/total_propuesta.controller');


router.get('/totalpropuesta/:id', total_propuesta_controller.getTotalPropuestaByIdController);
router.get('/totalpropuesta/all', total_propuesta_controller.getAllTotalPropuestaController);
router.post('/totalpropuesta', total_propuesta_controller.createTotalPropuestaController);
router.put('/totalpropuesta/:id', total_propuesta_controller.updateTotalPropuestaController);
router.delete('/totalpropuesta/:id', total_propuesta_controller.deleteTotalPropuestaController);

module.exports = router