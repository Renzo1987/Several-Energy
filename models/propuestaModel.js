const pool = require("../config/db_pgsql");
const queriesPropuesta = require("../queries/propuesta");

const createPropuesta = async (values) => {
  return pool.query(queriesPropuesta.createPropuesta, values);
};

const getPropuesta = async () => {
  return pool.query(queriesPropuesta.getPropuesta);
};

const getPropuestaById = async (id) => {
  return pool.query(queriesPropuesta.getPropuestaById, [id]);
};

const updatePropuesta = async (id, values) => {
  return pool.query(queriesPropuesta.updatePropuesta, [id, ...values]);
};

const deletePropuesta = async (id) => {
  return pool.query(queriesPropuesta.deletePropuesta, [id]);
};

module.exports = {
  createPropuesta,
  getPropuesta,
  getPropuestaById,
  updatePropuesta,
  deletePropuesta,
};
