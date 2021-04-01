const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
app.use(cors())

//Port
port = 3333;
require('dotenv').config({ path: '.env' })
//Listen port on socket
app.listen(port)

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//API routes
app.use('/api', require('./app/routes/approutes'));