const {sql} = require('../dbConnection');

exports.postUser = async (user) => {
        const users = await sql`
        INSERT INTO users (name, price)
        VALUES(${user.name}, ${user.price})
        RETURNING *
        `;
        return users[0];

}

exports.getInvoicesCount = async () => {
    const invoices = await sql`
    SELECT COUNT(*)
    FROM users
    `
    return invoices

}

exports.getAllInvoices = async () => {
    const invoices =  await sql`
    SELECT id, name, price, date, status
    FROM users
    `;

    return invoices;
}
