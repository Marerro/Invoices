const {sql} = require ('../dbConnection');

exports.userRegister = async (user) => {
    const users = await sql`
    INSERT INTO userdetails ${sql(user, 'name', 'email', 'password')}
    RETURNING *;
    `
    return users[0];
}