const franjasClienteModel = require("../models/franjasClienteModel");

const getAllFranjasCliente = async (req, res) => {
  try {
    const result = await franjasClienteModel.getFranjasCliente();
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing GET query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getFranjasClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await franjasClienteModel.getFranjasClienteById(id);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing GET by ID query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createFranjasCliente = async (req, res) => {
  const values = Object.values(req.body);
  try {
    await franjasClienteModel.createFranjasCliente(values);
    res.status(201).send("Franjas_Cliente created successfully");
  } catch (error) {
    console.error("Error executing POST query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateFranjasCliente = async (req, res) => {
  const { id } = req.params;
  const values = Object.values(req.body);
  try {
    await franjasClienteModel.updateFranjasCliente(id, values);
    res.send("Franjas_Cliente updated successfully");
  } catch (error) {
    console.error("Error executing PUT query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteFranjasCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await franjasClienteModel.deleteFranjasCliente(id);
    res.send("Franjas_Cliente deleted successfully");
  } catch (error) {
    console.error("Error executing DELETE query:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllFranjasCliente,
  getFranjasClienteById,
  createFranjasCliente,
  updateFranjasCliente,
  deleteFranjasCliente,
};
