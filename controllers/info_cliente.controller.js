const info_cliente = require("../models/info_cliente.model");

async function getAllInfoClienteController(req, res) {
    try {
      const data = await info_cliente.getInfoCliente();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function getInfoClienteByIdController(req, res) {
    try {
      const id = req.params.info_id;
      const data = await info_cliente.getInfoClienteById(id);
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'Datos not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function createInfoClienteController(req, res) {
    try { 
      const newData = await info_cliente.createInfoCliente(req.body); //si no funciona deconstructing
      res.status(201).json(newData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function updateInfoClienteController(req, res) {
    try {
      const id = req.params.info_id;
      const updatedData = await info_cliente.updateInfoCliente(id, req.body);
      if (updatedData) {
        res.status(200).json(updatedData);
      } else {
        res.status(404).json({ error: 'Datos not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function deleteInfoClienteController(req, res) {
    try {
      const id = req.params.info_id;
      const exito = await info_cliente.deleteInfoCliente(id);
      if (exito) {
        res.status(200).json({ message: 'Datos_Cliente deleted successfully' });
      } else {
        res.status(404).json({ error: 'Datos not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {getAllInfoClienteController,
    getInfoClienteByIdController,
    createInfoClienteController,
    updateInfoClienteController,
    deleteInfoClienteController
  };
