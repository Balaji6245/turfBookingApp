const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const color = require('colors');
const dbConnect = require('./src/connection/dbConnection');
const AuthRouters = require('./src/controllers/authRouter');
const CommonRouter = require('./src/controllers/commonRouter');

dotenv.config();
const app = express();

dbConnect();

app.use(cors());
const limit = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Min
    max: 10, // 10 request
    message: "Too many request please try after"
});
app.use(limit);
app.use(express.json());

app.use('/api/v1/auth', AuthRouters);
app.use('/api/v1', CommonRouter)

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server now running on ${PORT}`.yellow.bold)
});