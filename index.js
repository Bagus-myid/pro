const express = require('express')
const secure = require('ssl-express-www')
const PORT = process.env.PORT || 8080;
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
var app = express();
app.use(secure)
app.use(morgan('dev'));
app.use(express.static('client'));
app.set("json spaces",2)
__path = process.cwd()


var api = require('./server/api.js');
var main = require('./main');

app.use('/api', api)
app.use('/', main)

app.listen(PORT, () => {
    console.log(`Server Run on port ${PORT}`)
});
