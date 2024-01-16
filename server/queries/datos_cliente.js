const queriesDatos_Cliente = {
    
    createDatos_Cliente: `INSERT INTO datos_cliente (info_id, dias_facturacion, energia_reactiva, impuesto_electrico, alquiler_equipo, otros_1, otros_2, iva) 
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                          RETURNING *`,
  
    getDatos_Cliente: `SELECT * FROM datos_cliente`,
  
    getDatos_ClienteById: `SELECT * 
                          FROM datos_cliente
                          WHERE datos_id=$1`,
  
    updateDatos_Cliente: `UPDATE datos_cliente 
                        SET dias_facturacion = $2, energia_reactiva = $3, impuesto_electrico = $4, alquiler_equipo = $5, otros_1 = $6, otros_2 = $7, iva = $8 
                        WHERE datos_id = $1
                        RETURNING *`,
  
    deleteDatos_Cliente: `DELETE FROM datos_cliente WHERE datos_id = $1;`
  };
  
  module.exports = queriesDatos_Cliente;