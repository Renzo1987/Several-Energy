const pool = require("../config/db_pgsql");
const queriesInfo_Cliente = require("../queries/info_cliente");

async function createInfoCliente(body) {
  try {
    const {usuario_id, 
      titular, 
      direccion, 
      cup, 
      comp_actual} = body

    const result = await pool.query(queriesInfo_Cliente.createInfo_Cliente, [usuario_id, titular, direccion, cup, comp_actual]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function getInfoCliente() {
    try {
      const result = await pool.query(queriesInfo_Cliente.getInfo_Cliente);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function getInfoClienteById(info_id) {
  try {
    const result = await pool.query(queriesInfo_Cliente.getInfo_ClienteById, [info_id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}



async function updateInfoCliente(info_id, body) {
  try {
    const { 
      usuario_id,
      titular, 
      direccion, 
      cup, 
      comp_actual} = body
    const result = await pool.query(
      queriesInfo_Cliente.updateInfo_Cliente,
      [info_id, usuario_id, titular, direccion, cup, comp_actual] 
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteInfoCliente(info_id) {
  try {
    const result = await pool.query(queriesInfo_Cliente.deleteInfo_Cliente, [info_id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports ={
  createInfoCliente,
  getInfoCliente,
  getInfoClienteById,
  updateInfoCliente,
  deleteInfoCliente
}