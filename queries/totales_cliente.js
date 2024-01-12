const queriesTotales_Cliente = {
  createTotales_Cliente: `INSERT INTO totales_cliente (info_id,
                        t_con_anual,
                        t_con_fact_actual,
                        t_pago_fact_energia,
                        t_pago_anual_energia,
                        t_pago_fact_potencia, 
                        t_pago_anual_potencia, 
                        importe_total_factura, 
                        total_anual_estimado ) 
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        RETURNING *`,
  
    getTotales_Cliente: `SELECT * FROM totales_cliente`,
  
    getTotales_ClienteById: `SELECT * 
                          FROM totales_cliente
                          WHERE totales_id=$1`,

  updateTotales_Cliente: `UPDATE totales_cliente 
                        SET t_con_anual = $2, 
                        t_con_fact_actual = $3, 
                        t_pago_fact_energia = $4, 
                        t_pago_anual_energia = $5, 
                        t_pago_fact_potencia = $6, 
                        t_pago_anual_potencia = $7, 
                        importe_total_factura = $8,
                        total_anual_estimado = $9
                        WHERE totales_id = $1
                        RETURNING *`,
  
    deleteTotales_Cliente: `DELETE FROM totales_cliente WHERE totales_id = $1;`
  };
  
  module.exports = queriesTotales_Cliente;
