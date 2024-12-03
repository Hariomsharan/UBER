const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./Routes/userRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();

app.use(cors());
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send("Hello World!");
});

module.exports = app;