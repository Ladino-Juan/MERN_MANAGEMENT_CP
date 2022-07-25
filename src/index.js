const express = require('express');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors')
require("dotenv").config({path:__dirname+'/.env'})

const { mongoose } = require('./database/database')

const app = express();

//Settings
app.set('port', process.env.PORT || 3000)


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//Routes
app.use('/usuario',require('./routes/client.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});