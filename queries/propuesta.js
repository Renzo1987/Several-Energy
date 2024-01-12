const queriesPropuesta = {
  createPropuesta: `INSERT INTO propuesta(
                          info_id, 
                          franja, 
                          total_pago_fact_energia, 
                          total_pago_anual_energia,
                          total_pago_fact_potencia,
                          total_pago_anual_potencia)
                          VALUES ($1, $2, $3, $4, $5, $6);
                          RETURNING *`,

  getPropuesta: `SELECT * FROM propuesta`,

  getPropuestaById: `SELECT * 
                          FROM propuesta
                          WHERE propuesta_id=$1`,

  updatePropuesta: `UPDATE propuesta
                          SET franja = $2, 
                          total_pago_fact_energia = $3, 
                          total_pago_anual_energia = $4,
                          total_pago_fact_potencia = $5,
                          total_pago_anual_potencia = $6
                          WHERE propuesta_id = $1;
                          RETURNING *`,

  deletePropuesta: `DELETE FROM propuesta WHERE propuesta_id = $1;`,
};

module.exports = queriesPropuesta;
