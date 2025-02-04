const {sql} = require('../dbConnection');

exports.postUser = async (user) => {
        const currentDate = new Date()
        const formatedDate = currentDate.toISOString().split('T')[0]
        console.log(formatedDate);
        const users = await sql`
        INSERT INTO users (name, price, status, date)
        VALUES(${user.name}, ${user.price}, ${user.status || "draft"}, ${formatedDate})
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

exports.EditUser = async (updInvoice, id) => {
    const editInvoice = await sql`
    UPDATE users
    SET name = ${updInvoice.name}, price = ${updInvoice.price}, status = ${updInvoice.status}
    WHERE id = ${id}
    RETURNING *;
    `

    return editInvoice[0];
}

exports.deleteUser = async (id) => {
    const deletedInvoice = await sql`
    DELETE
    FROM users
    WHERE id = ${id}
    `

    return deletedInvoice[0];
}
