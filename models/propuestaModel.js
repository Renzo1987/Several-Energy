const pool = require("../config/db_pgsql");
const propuestaQueries = require("../queries/queriesPropuesta");

async function createPropuesta(values) {
  try {
    const result = await pool.query(propuestaQueries.createPropuesta, values);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllPropuestas() {
  try {
    const result = await pool.query(propuestaQueries.getPropuesta);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPropuestaById(id) {
  try {
    const result = await pool.query(propuestaQueries.getPropuestaById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updatePropuesta(id, values) {
  try {
    const result = await pool.query(propuestaQueries.updatePropuesta, [
      id,
      ...values,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deletePropuesta(id) {
  try {
    const result = await pool.query(propuestaQueries.deletePropuesta, [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createPropuesta,
  getAllPropuestas,
  getPropuestaById,
  updatePropuesta,
  deletePropuesta,
};
