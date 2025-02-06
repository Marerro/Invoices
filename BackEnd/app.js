const express = require('express');
const cors = require('cors');

// endpoint
const userRouter = require('./Router/userRouter');
const registerRouter = require('./Router/registerRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", registerRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;