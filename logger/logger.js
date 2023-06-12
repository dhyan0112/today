const winston=require('winston');
const { MongoDB } = require('winston-mongodb');
const {format} = require('logform');
const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.mongoURL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const logger=winston.createLogger({

format: format.combine(

format.timestamp(),

format.errors({ stack: true }),

format.splat(),

format.json()

), transports: [

new winston.transports.console(),

new MongoDB({

db: mongoose.connection,
options: {useunifiedTopology: true},

collection: 'logs',

level: 'error'

})
]
});