const express = require('express');
const cors = require('cors');

// endpoint
const userRouter = require('./Router/userRouter');

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/v1/users", userRouter);

module.exports = app;