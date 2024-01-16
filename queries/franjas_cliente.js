const queriesFranjas_Cliente = {
  createFranjas_Cliente: `INSERT INTO franjas_cliente (
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
    total_pago_anual_potencia
  ) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
  RETURNING *`,

  getFranjas_Cliente: `SELECT * FROM franjas_cliente;`,

  getFranjas_ClienteById: `SELECT * FROM franjas_cliente WHERE franjas_id = $1;`,

  updateFranjas_Cliente: `UPDATE franjas_cliente 
SET 
  franja = $2, 
  con_anual = $3, 
  con_fact_actual = $4, 
  pre_ener_act_me = $5,
  pre_ener_act_mes_fact = $6,
  descuento_energia = $7,
  pre_desc_energia = $8,
  total_pago_fact_energia = $9,
  total_pago_anual_energia = $10,
  pot_cont = $11,
  pot_fact = $12,
  precio_pot = $13,
  descuento_potencia = $14,
  pre_desc_pot = $15,
  total_pago_fact_potencia = $16,
  total_pago_anual_potencia = $17
  WHERE franjas_id = $1
  RETURNING *`,

  deleteFranjas_Cliente: `DELETE FROM franjas_cliente WHERE franjas_id = $1;`,
};

module.exports = queriesFranjas_Cliente;
