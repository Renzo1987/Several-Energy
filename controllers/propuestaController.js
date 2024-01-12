const PropuestaModel = require("../models/propuestaModel");

const getAllPropuesta = async (req, res) => {
  try {
    const result = await PropuestaModel.getPropuesta();
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing GET query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getPropuestaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PropuestaModel.getPropuestaById(id);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing GET by ID query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createPropuesta = async (req, res) => {
  const values = Object.values(req.body);
  try {
    await PropuestaModel.createPropuesta(values);
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
    await PropuestaModel.updatePropuesta(id, values);
    res.send("Propuesta updated successfully");
  } catch (error) {
    console.error("Error executing PUT query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deletePropuesta = async (req, res) => {
  const { id } = req.params;
  try {
    await PropuestaModel.deletePropuesta(id);
    res.send("Propuesta deleted successfully");
  } catch (error) {
    console.error("Error executing DELETE query:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllPropuesta,
  getPropuestaById,
  createPropuesta,
  updatePropuesta,
  deletePropuesta,
};
