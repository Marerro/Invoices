const {sql} = require ('../dbConnection');

exports.userRegister = async (user) => {
    const users = await sql`
    INSERT INTO userdetails (name, email, password, roles)
    VALUES (${user.name}, ${user.email}, ${user.password}, ${user.roles || "user"})
    RETURNING *;
    `
    return users[0];
}

exports.getUserByEmail = async (email) => {
    const user = await sql`
    SELECT userdetails.*
    FROM userdetails
    WHERE userdetails.email = ${email};
    `;
    return user[0];
}

exports.getUserById = async (id) => {
    const [user] = await sql`
    SELECT userdetails.*
    FROM userdetails
    WHERE userdetails.id = ${id}`;
    return user;
}