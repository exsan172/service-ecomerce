require("dotenv").config()
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

const config = require("./config")
const clientRoutes    = require('./routes/client.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();
config.databaseConnection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, 'uploads')));

app.use('/dashboard-service', dashboardRoutes);
app.use('/client-service', clientRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	config.response(res, 404, "Path not found.")
});

// error handler
app.use(function(err, req, res, next) {
	config.response(res, err.status || 500, err.message)
});

module.exports = app;