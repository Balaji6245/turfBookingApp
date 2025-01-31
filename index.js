const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const color = require('colors');
const dbConnect = require('./src/connection/dbConnection');

dotenv.config();
const app = express();

dbConnect();

app.use(cors());
const limit = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: "Too many request please try after"
});
app.use(limit);
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server now running on ${PORT}`.yellow.bold)
});