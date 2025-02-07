const {sql} = require ('../dbConnection');

exports.userRegister = async (user) => {
    const users = await sql`
    INSERT INTO userdetails ${sql(user, 'name', 'email', 'password')}
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