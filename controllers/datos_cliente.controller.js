const datos_cliente = require("../models/datos_cliente.model");

async function getAllDatosClienteController(req, res) {
    try {
      const data = await datos_cliente.getAllDatosCliente();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function getDatosClienteByIdController(req, res) {
    try {
      const id = req.params.id;
      const data = await datos_cliente.getDatosClienteById(id);
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ error: 'Datos not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function createDatosClienteController(req, res) {
    try {
      const newData = await datos_cliente.createDatosCliente(req.body);
      res.status(201).json(newData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function updateDatosClienteController(req, res) {
    try {
      const id = parseInt(req.params.id);
      const updatedData = await datos_cliente.updateDatos_Cliente(id, req.body);
      if (updatedData) {
        res.status(200).json(updatedData);
      } else {
        res.status(404).json({ error: 'Datos not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async function deleteDatosClienteController(req, res) {
    try {
      const id = parseInt(req.params.id);
      const exito = await datos_cliente.deleteDatos_Cliente(id);
      if (exito) {
        res.status(200).json({ message: 'Datos_Cliente deleted successfully' });
      } else {
        res.status(404).json({ error: 'Datos not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  module.exports = {
    getAllDatosClienteController,
    getDatosClienteByIdController,
    createDatosClienteController,
    updateDatosClienteController,
    deleteDatosClienteController,
  };
