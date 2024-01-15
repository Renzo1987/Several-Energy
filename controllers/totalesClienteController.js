const totalesClienteModel = require("../models/totalesClienteModel");

const getAllTotalesCliente = async (req, res) => {
  try {
    const result = await totalesClienteModel.getAllTotalesCliente();
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const getTotalesClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await totalesClienteModel.getTotalesClienteById(id);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const createTotalesCliente = async (req, res) => {
  try {
    const result = await totalesClienteModel.createTotalesCliente(req.body);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const updateTotalesCliente = async (req, res) => {
  const id = req.params.id;
  try {
    await totalesClienteModel.updateTotalesCliente(id, req.body);
    res.json({ message: "Totales_Cliente updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const deleteTotalesCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await totalesClienteModel.deleteTotalesCliente(id);
    res.json({ message: "Totales_Cliente deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = {
  getAllTotalesCliente,
  getTotalesClienteById,
  createTotalesCliente,
  updateTotalesCliente,
  deleteTotalesCliente,
};
