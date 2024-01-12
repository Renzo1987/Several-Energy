const propuestaModel = require("../models/propuestaModel");

const getPropuestaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await propuestaModel.getPropuestaById(id);
    res.json(result);
  } catch (error) {
    console.error("Error executing GET by ID query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createPropuesta = async (req, res) => {
  const values = Object.values(req.body);
  try {
    await propuestaModel.createPropuesta(values);
    res.status(201).send("Propuesta created successfully");
  } catch (error) {
    console.error("Error executing POST query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updatePropuesta = async (req, res) => {
  const { id } = req.params;
  const values = Object.values(req.body);
  try {
    await propuestaModel.updatePropuesta(id, values);
    res.send("Propuesta updated successfully");
  } catch (error) {
    console.error("Error executing PUT query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deletePropuesta = async (req, res) => {
  const { id } = req.params;
  try {
    await propuestaModel.deletePropuesta(id);
    res.send("Propuesta deleted successfully");
  } catch (error) {
    console.error("Error executing DELETE query:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllPropuestas,
  getPropuestaById,
  createPropuesta,
  updatePropuesta,
  deletePropuesta,
};
