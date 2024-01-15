const total_propuesta = require("../models/total_propuesta.model");

async function getAllTotalPropuestaController(req, res) {
  try {
    const data = await total_propuesta.getTotalPropuesta();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTotalPropuestaByIdController(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = await total_propuesta.getTotalPropuestaById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "Datos not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createTotalPropuestaController(req, res) {
  try {
    const newData = await total_propuesta.createTotalPropuesta(req.body);
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTotalPropuestaController(req, res) {
  try {
    const id = parseInt(req.params.id);
    const updatedDatos = await total_propuesta.updateTotalPropuesta(
      id,
      req.body
    );
    if (updatedDatos) {
      res.status(200).json(updatedDatos);
    } else {
      res.status(404).json({ error: "Datos not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTotalPropuestaController(req, res) {
  try {
    const id = parseInt(req.params.id);
    const exito = await total_propuesta.deleteTotalPropuesta(id);
    if (exito) {
      res.status(200).json({ message: "Datos_Cliente deleted successfully" });
    } else {
      res.status(404).json({ error: "Datos not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllTotalPropuestaController,
  getTotalPropuestaByIdController,
  createTotalPropuestaController,
  updateTotalPropuestaController,
  deleteTotalPropuestaController,
};
