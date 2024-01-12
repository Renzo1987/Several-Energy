const pool = require("../config/db_pgsql");
const franjasQueries = require("../queries/queriesFranjas_Cliente");

async function createFranjasCliente(values) {
  try {
    const result = await pool.query(
      franjasQueries.createFranjas_Cliente,
      values
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllFranjasCliente() {
  try {
    const result = await pool.query(franjasQueries.getFranjas_Cliente);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getFranjasClienteById(id) {
  try {
    const result = await pool.query(franjasQueries.getFranjas_ClienteById, [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateFranjasCliente(id, values) {
  try {
    const result = await pool.query(franjasQueries.updateFranjas_Cliente, [
      id,
      ...values,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteFranjasCliente(id) {
  try {
    const result = await pool.query(franjasQueries.deleteFranjas_Cliente, [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createFranjasCliente,
  getAllFranjasCliente,
  getFranjasClienteById,
  updateFranjasCliente,
  deleteFranjasCliente,
};
