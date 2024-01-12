const pool = require("../config/db");
const queriesTotales_Cliente = require("../queries/totales_cliente");

const createTotalesCliente = async (values) => {
  return pool.query(queriesTotales_Cliente.createTotales_Cliente, values);
};

const getTotalesCliente = async () => {
  return pool.query(queriesTotales_Cliente.getTotales_Cliente);
};

const getTotalesClienteById = async (id) => {
  return pool.query(queriesTotales_Cliente.getTotales_ClienteById, [id]);
};

const updateTotalesCliente = async (id, values) => {
  return pool.query(queriesTotales_Cliente.updateTotales_Cliente, [
    id,
    ...values,
  ]);
};

const deleteTotalesCliente = async (id) => {
  return pool.query(queriesTotales_Cliente.deleteTotales_Cliente, [id]);
};

module.exports = {
  createTotalesCliente,
  getTotalesCliente,
  getTotalesClienteById,
  updateTotalesCliente,
  deleteTotalesCliente,
};
