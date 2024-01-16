const pool = require("../config/db_pgsql");
const queriesDatos_Cliente = require("../queries/datos_cliente");

async function createDatosCliente(body) {
  try {
    const {
      info_id,
      dias_facturacion,
      energia_reactiva,
      impuesto_electrico,
      alquiler_equipo,
      otros_1,
      otros_2,
      iva,
    } = body;

    const result = await pool.query(queriesDatos_Cliente.createDatos_Cliente, [
      info_id,
      dias_facturacion,
      energia_reactiva,
      impuesto_electrico,
      alquiler_equipo,
      otros_1,
      otros_2,
      iva,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllDatosCliente() {
  try {
    const result = await pool.query(queriesDatos_Cliente.getDatos_Cliente);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getDatosClienteById(datos_cliente_id) {
  try {
    const result = await pool.query(queriesDatos_Cliente.getDatos_ClienteById, [
      datos_cliente_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateDatos_Cliente(datos_cliente_id, body) {
  try {
    const {
      dias_facturacion,
      energia_reactiva,
      impuesto_electrico,
      alquiler_equipo,
      otros_1,
      otros_2,
      iva,
    } = body;

    const result = await pool.query(queriesDatos_Cliente.updateDatos_Cliente, [
      dias_facturacion,
      energia_reactiva,
      impuesto_electrico,
      alquiler_equipo,
      otros_1,
      otros_2,
      iva,
      datos_cliente_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteDatos_Cliente(datos_cliente_id) {
  try {
    const result = await pool.query(queriesDatos_Cliente.deleteDatos_Cliente, [
      datos_cliente_id,
    ]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getAllDatosCliente,
  createDatosCliente,
  deleteDatos_Cliente,
  updateDatos_Cliente,
  getDatosClienteById,
};
