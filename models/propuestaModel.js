const pool = require("../config/db_pgsql");
const propuestaQueries = require("../queries/propuesta");

async function createPropuesta(body) {
  try {
    const {
      info_id,
      franja,
      total_pago_fact_energia,
      total_pago_anual_energia,
      total_pago_fact_potencia,
      total_pago_anual_potencia,
    } = body;

    const result = await pool.query(propuestaQueries.createPropuesta, [
      info_id,
      franja,
      total_pago_fact_energia,
      total_pago_anual_energia,
      total_pago_fact_potencia,
      total_pago_anual_potencia,
    ]);

    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllPropuesta() {
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
  getAllPropuesta,
  getPropuestaById,
  updatePropuesta,
  deletePropuesta,
};
