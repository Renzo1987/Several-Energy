const pool = require("../config/db_pgsql");
const queriesTotal_Propuesta = require("../queries/total_propuesta");

async function createTotalPropuesta(body) {
  try {
    const {
      info_id,
      t_con_anual,
      t_con_fact_actual,
      t_pago_fact_energia,
      t_pago_anual_energia,
      t_pago_fact_potencia,
      t_pago_anual_potencia,
      importe_total_factura,
      total_anual_estimado,
      ahorro_fact_actual,
      ahorro_anual,
    } = body;

    const result = await pool.query(
      queriesTotal_Propuesta.createTotalPropuesta,
      [
        info_id,
        t_con_anual,
        t_con_fact_actual,
        t_pago_fact_energia,
        t_pago_anual_energia,
        t_pago_fact_potencia,
        t_pago_anual_potencia,
        importe_total_factura,
        total_anual_estimado,
        ahorro_fact_actual,
        ahorro_anual,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalPropuesta() {
  try {
    const result = await pool.query(queriesTotal_Propuesta.getTotalPropuesta);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getTotalPropuestaById(total_propuesta_id) {
  try {
    const result = await pool.query(
      queriesTotal_Propuesta.getTotalPropuestaById,
      [total_propuesta_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateTotalPropuesta(total_propuesta_id, body) {
  try {
    const {
      t_con_anual,
      t_con_fact_actual,
      t_pago_fact_energia,
      t_pago_anual_energia,
      t_pago_fact_potencia,
      t_pago_anual_potencia,
      importe_total_factura,
      total_anual_estimado,
      ahorro_fact_actual,
      ahorro_anual,
    } = body;

    const result = await pool.query(
      queriesTotal_Propuesta.updateTotalPropuesta,
      [
        t_con_anual,
        t_con_fact_actual,
        t_pago_fact_energia,
        t_pago_anual_energia,
        t_pago_fact_potencia,
        t_pago_anual_potencia,
        importe_total_factura,
        total_anual_estimado,
        ahorro_fact_actual,
        ahorro_anual,
        total_propuesta_id,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteTotalPropuesta(total_propuesta_id) {
  try {
    const result = await pool.query(
      queriesTotal_Propuesta.deleteTotalPropuesta,
      [total_propuesta_id]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createTotalPropuesta,
  getTotalPropuestaById,
  getTotalPropuesta,
  updateTotalPropuesta,
  deleteTotalPropuesta,
};
