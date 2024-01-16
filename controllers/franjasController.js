const franjasClienteModel = require("../models/franjasClienteModel");

const getAllFranjasCliente = async (req, res) => {
  try {
    const data = await franjasClienteModel.getAllFranjasCliente();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getFranjasClienteById = async (req, res) => {
  const id  = req.params.id
  try {
    const id = req.params.id;
    const data = await franjasClienteModel.getFranjasClienteById(id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Datos not found' });
    }
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
try {
    const id = req.params.id;
    const updatedData = await franjasClienteModel.updateFranjasCliente(id, req.body);
    if (updatedData) {      
      res.status(200).json(updatedData);
    } else {
      res.status(404).json({ error: 'Franjas not found' });
    }
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
