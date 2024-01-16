const pool = require("../config/db_pgsql");
const totalesClienteQueries = require("../queries/totales_cliente");

async function createTotalesCliente(body) {
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
    } = body;

    const result = await pool.query(
      totalesClienteQueries.createTotales_Cliente,
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
      ]
    );
    return result.rows[0];
  } catch (error) {
    throw { error: "Internal Server Error", details: error.message };
  }
}

async function getAllTotalesCliente() {
  try {
    const result = await pool.query(totalesClienteQueries.getTotales_Cliente);
    return result.rows;
  } catch (error) {
    throw { error: "Internal Server Error", details: error.message };
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
    throw { error: "Internal Server Error", details: error.message };
  }
}

async function updateTotalesCliente(id, body) {
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
    } = body;

    const result = await pool.query(
      totalesClienteQueries.updateTotales_Cliente,
      [id, 
        t_con_anual,
        t_con_fact_actual,
        t_pago_fact_energia,
        t_pago_anual_energia,
        t_pago_fact_potencia,
        t_pago_anual_potencia,
        importe_total_factura,
        total_anual_estimado]
    );
    return result.rows[0];
  } catch (error) {
    throw { error: "Internal Server Error", details: error.message };
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
    throw { error: "Internal Server Error", details: error.message };
  }
}

module.exports = {
  createTotalesCliente,
  getAllTotalesCliente,
  getTotalesClienteById,
  updateTotalesCliente,
  deleteTotalesCliente,
};
