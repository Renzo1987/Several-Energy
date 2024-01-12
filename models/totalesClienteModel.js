const pool = require("../config/db_pgsql");
const totalesClienteQueries = require("../queries/queriesTotales_Cliente");

async function createTotalesCliente(values) {
  try {
    const result = await pool.query(
      totalesClienteQueries.createTotales_Cliente,
      values
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllTotalesCliente() {
  try {
    const result = await pool.query(totalesClienteQueries.getTotales_Cliente);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalesClienteById(id) {
  try {
    const result = await pool.query(
      totalesClienteQueries.getTotales_ClienteById,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateTotalesCliente(id, values) {
  try {
    const result = await pool.query(
      totalesClienteQueries.updateTotales_Cliente,
      [id, ...values]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteTotalesCliente(id) {
  try {
    const result = await pool.query(
      totalesClienteQueries.deleteTotales_Cliente,
      [id]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createTotalesCliente,
  getAllTotalesCliente,
  getTotalesClienteById,
  updateTotalesCliente,
  deleteTotalesCliente,
};
