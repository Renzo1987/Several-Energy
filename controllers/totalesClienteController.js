const totalesClienteModel = require("../models/totalesClienteModel");

const getAllTotalesCliente = async (req, res) => {
  try {
    const result = await totalesClienteModel.getAllTotalesCliente();
    res.json(result);
  } catch (error) {
    console.error("Error executing GET query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getTotalesClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await totalesClienteModel.getTotalesClienteById(id);
    res.json(result);
  } catch (error) {
    console.error("Error executing GET by ID query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const createTotalesCliente = async (req, res) => {
  const values = Object.values(req.body);
  try {
    await totalesClienteModel.createTotalesCliente(values);
    res.status(201).send("Totales_Cliente created successfully");
  } catch (error) {
    console.error("Error executing POST query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateTotalesCliente = async (req, res) => {
  const { id } = req.params;
  const values = Object.values(req.body);
  try {
    await totalesClienteModel.updateTotalesCliente(id, values);
    res.send("Totales_Cliente updated successfully");
  } catch (error) {
    console.error("Error executing PUT query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteTotalesCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await totalesClienteModel.deleteTotalesCliente(id);
    res.send("Totales_Cliente deleted successfully");
  } catch (error) {
    console.error("Error executing DELETE query:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllTotalesCliente,
  getTotalesClienteById,
  createTotalesCliente,
  updateTotalesCliente,
  deleteTotalesCliente,
};
