const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');

// endpoint
const invoicesRouter = require('./Router/invoiceRouter');
const registerRouter = require('./Router/registerRouter');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use("/api/v1/auth", registerRouter);
app.use("/api/v1/invoices", invoicesRouter);

app.use(errorHandler);

module.exports = app;