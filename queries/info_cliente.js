const queriesInfo_Cliente = {
    
  createInfo_Cliente: `INSERT INTO info_cliente (
                        usuario_id, 
                        titular, 
                        direccion, 
                        cup, 
                        comp_actual) 
                        VALUES ($1, $2, $3, $4, $5)
                        RETURNING *`,

  getInfo_Cliente: `SELECT * FROM info_cliente`,

  getInfo_ClienteById: `SELECT * 
                        FROM info_cliente
                        WHERE info_id=$1`,

  updateInfo_Cliente: `UPDATE info_cliente 
                        SET titular = $2, 
                        direccion = $3, 
                        cup = $4, 
                        comp_actual = $5 
                        WHERE info_id = $1
                        RETURNING *`,

  deleteInfo_Cliente: `DELETE FROM info_cliente WHERE info_id = $1;`
};

module.exports = queriesInfo_Cliente;
