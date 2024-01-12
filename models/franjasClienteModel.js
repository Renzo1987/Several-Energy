const pool = require("../config/db_pgsql");
const franjasQueries = require("../queries/franjas_cliente");

async function createFranjasCliente(body) {
  try {
    const {
      info_id,
      franja,
      con_anual,
      con_fact_actual,
      pre_ener_act_me,
      pre_ener_act_mes_fact,
      descuento_energia,
      pre_desc_energia,
      total_pago_fact_energia,
      total_pago_anual_energia,
      pot_cont,
      pot_fact,
      precio_pot,
      descuento_potencia,
      pre_desc_pot,
      total_pago_fact_potencia,
      total_pago_anual_potencia,
    } = body;

    const result = await pool.query(
      queriesFranjas_Cliente.createFranjas_Cliente,
      [
        info_id,
        franja,
        con_anual,
        con_fact_actual,
        pre_ener_act_me,
        pre_ener_act_mes_fact,
        descuento_energia,
        pre_desc_energia,
        total_pago_fact_energia,
        total_pago_anual_energia,
        pot_cont,
        pot_fact,
        precio_pot,
        descuento_potencia,
        pre_desc_pot,
        total_pago_fact_potencia,
        total_pago_anual_potencia,
      ]
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
