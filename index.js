const express=require('express');
const app=express();
const cors=require('cors');
const { connect }=require('./config/db');
const { userRouter } = require('./controllers/user');
const { weatherRouter } = require('./controllers/weather');
const { authentication }=require('./middleware/authentication')
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/users',userRouter);
app.use(authentication);;
app.use('/weather',weatherRouter);


app.listen(process.env.Port,async()=>{
    try{
        await connect;
        console.log('Connected to Database');
    }catch(err){
        console.log(err.message);
    }
    console.log(`Server is running at Port ${process.env.Port}`);
})