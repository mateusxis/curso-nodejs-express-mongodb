const express = require("express");
const bodyParser = require('body-parser');

const routes = require('./routes');
const database = require('./config/database');

const app = express();

database();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

routes(app);

app.listen(3000);

module.exports = app;
