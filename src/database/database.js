const mongoose = require('mongoose');
require("dotenv").config({path:__dirname+'/.env'})

const database = process.env.DATABASE_KEY;
mongoose.connect(database)
    .then(db=> console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose