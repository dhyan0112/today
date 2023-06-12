const mongoose=require('mongoose');
mongoose.set('strictQuery',false);
require('dotenv').config();

const connect=mongoose.connect(process.env.mongoURL);

module.exports={
    connect
}