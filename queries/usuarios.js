const queriesUser = {
    getUserById: `
        SELECT 
            username,
            email,
            password
        FROM users
        WHERE id_user = $1;`,

    getUserByEmail: `
        SELECT
            usuario_id, 
            asesor,
            email,
            contacto,
            delegacion,
            password
        FROM usuarios
        WHERE email = $1;`,
                        
    getAllUsers: `SELECT * FROM users;`,

    createUser: `INSERT INTO usuarios(email, password, asesor, contacto, delegacion) 
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *`,

    updateUser:  `UPDATE users
                    SET email = $1, admin = $2
                    WHERE id_user = $3;
                    RETURNING *`,

    deleteUser: `DELETE FROM users
                    WHERE id_user = $1;`
}
module.exports = queriesUser;
