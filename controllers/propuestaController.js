const propuestaModel = require("../models/propuestaModel");

const getAllPropuestas = async (req, res) => {
  try {
    const result = await propuestaModel.getAllPropuesta();
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getPropuestaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await propuestaModel.getPropuestaById(id);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const createPropuesta = async (req, res) => {
  try {
    const newPropuesta = await propuestaModel.createPropuesta(req.body);
    res.status(201).json(newPropuesta);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updatePropuesta = async (req, res) => {
  const { id } = req.params;
  const values = Object.values(req.body);
  try {
    await propuestaModel.updatePropuesta(id, values);
    res.json(req.body);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const deletePropuesta = async (req, res) => {
  const { id } = req.params;
  try {
    await propuestaModel.deletePropuesta(id);
    res.send("Propuesta deleted successfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  getAllPropuestas,
  getPropuestaById,
  createPropuesta,
  updatePropuesta,
  deletePropuesta,
};
