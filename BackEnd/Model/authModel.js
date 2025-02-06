const {sql} = require ('../dbConnection');

exports.userRegister = async (user) => {
    const users = await sql`
    INSERT INTO userdetails (name, email, password) 
    VALUES (${user.name}, ${user.email}, ${user.password})
    `
    return users[0];
}