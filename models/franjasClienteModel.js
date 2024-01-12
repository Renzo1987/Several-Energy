const pool = require("../config/db_pgsql");
const queriesFranjas_Cliente = require("../queries/queriesFranjas_Cliente");

const createFranjasCliente = async (values) => {
  return pool.query(queriesFranjas_Cliente.createFranjas_Cliente, values);
};

const getFranjasCliente = async () => {
  return pool.query(queriesFranjas_Cliente.getFranjas_cliente);
};

const getFranjasClienteById = async (id) => {
  return pool.query(queriesFranjas_Cliente.getFranjas_ClienteById, [id]);
};

const updateFranjasCliente = async (id, values) => {
  return pool.query(queriesFranjas_Cliente.updateFranjas_Cliente, [
    id,
    ...values,
  ]);
};

const deleteFranjasCliente = async (id) => {
  return pool.query(queriesFranjas_Cliente.deleteFranjas_Cliente, [id]);
};

module.exports = {
  createFranjasCliente,
  getFranjasCliente,
  getFranjasClienteById,
  updateFranjasCliente,
  deleteFranjasCliente,
};
