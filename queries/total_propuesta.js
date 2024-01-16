const queriesTotalPropuesta = {
  createTotalPropuesta: `INSERT INTO total_propuesta(
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
                          ahorro_anual                         
                          )
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                          RETURNING *`,

  getTotalPropuesta: `SELECT * FROM total_propuesta`,

  getTotalPropuestaById: `SELECT * 
                          FROM total_propuesta
                          WHERE total_propuesta_id=$1`,

  updateTotalPropuesta: `UPDATE total_propuesta
                          SET 
                          t_con_anual = $2, 
                          t_con_fact_actual = $3, 
                          t_pago_fact_energia = $4,
                          t_pago_anual_energia = $5,
                          t_pago_fact_potencia = $6,
                          t_pago_anual_potencia = $7,
                          importe_total_factura = $8,
                          total_anual_estimado = $9,
                          ahorro_fact_actual = $10,
                          ahorro_anual = $11  
                          WHERE total_propuesta_id = $1
                          RETURNING *`,

  deleteTotalPropuesta: `DELETE FROM total_propuesta WHERE total_propuesta_id = $1;`,
};

module.exports = queriesTotalPropuesta;
