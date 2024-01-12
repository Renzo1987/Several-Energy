const franjasClienteModel = require("../models/franjasClienteModel");

const getAllFranjasCliente = async (req, res) => {
  try {
    const result = await franjasClienteModel.getAllFranjasCliente();
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getFranjasClienteById = async (req, res) => {
  const id  = req.params.id
  try {
    const result = await franjasClienteModel.getFranjasClienteById(id);
    // if (result.rows.length === 0) {
    //   res.status(404).json({ error: "Client not found" });
    // } else {
    //   res.json(result.rows[0]);
    // }
    res.json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const createFranjasCliente = async (req, res) => {

  try {
    const result = await franjasClienteModel.createFranjasCliente(req.body);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateFranjasCliente = async (req, res) => {
  const { id } = req.params;
  const values = Object.values(req.body);
  try {
    await franjasClienteModel.updateFranjasCliente(id, values);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const deleteFranjasCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await franjasClienteModel.deleteFranjasCliente(id);
    res.send("Franjas_Cliente deleted successfully");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  getAllFranjasCliente,
  getFranjasClienteById,
  createFranjasCliente,
  updateFranjasCliente,
  deleteFranjasCliente,
};
