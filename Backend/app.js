const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const connectToDb = require('./db/db');
const userRoutes = require('./Routes/userRoutes')
const captainRoutes = require('./Routes/captainRoutes')
const mapRoutes = require('./Routes/mapRoutes')
const rideRoutes = require('./Routes/rideRoutes')

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)

app.get('/', (req, res) => {
    res.send("Hello World!");
});

module.exports = app;