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
                        SET 
                        usuario_id=$2,
                        titular = $3, 
                        direccion = $4, 
                        cup = $5, 
                        comp_actual = $6 
                        WHERE info_id = $1
                        RETURNING *`,

  deleteInfo_Cliente: `DELETE FROM info_cliente WHERE info_id = $1;`
};

module.exports = queriesInfo_Cliente;
