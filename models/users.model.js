const pool = require("../config/db_pgsql");
const queriesUsuarios = require("../queries/usuarios");

async function createUser(user) {
  try {
    const result = await pool.query(queriesUsuarios.createUser, [user.email, user.password, user.asesor, user.contacto, user.delegacion]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getUserById(id) {
  try {
    const result = await pool.query(queriesUsuarios.getUserById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const result = await pool.query(queriesUsuarios.getUserByEmail, [email]);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllUsers() {
    try {
      const result = await pool.query(queriesUsuarios.getAllUsers);
      return result.rows;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



async function updateUser(id, email, admin) {
  try {
    const result = await pool.query(
      queriesUsuarios.updateUser,
      [email, admin, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const result = await pool.query(queriesUsuarios.deleteUser, [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = { 
  createUser, 
  getAllUsers, 
  getUserById, 
  getUserByEmail, 
  updateUser, 
  deleteUser
};
