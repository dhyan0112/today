const express=require('express');
const redis=require('redis');
const axios=require('axios');
const { promisify }=require('util');
const weatherRouter=express.Router();
const client=redis.createClient();
require('dotenv').config();
const { limiter }=require('../middleware/ratelimit');

const getAsync = promisify(client.get).bind(client);
const setexAsync = promisify(client.setex).bind(client);

function validateCity (req, res, next) { 
    const { city } = req.query;
    if (Icity || typeof city != 'string' || /[^a-zA-Z\s]/.test(city)) { 
    return res.status(400).json({ error: 'Invalid city parameter' });
    }
    next();
}

weatherRouter.get('/weather',limiter,validateCity,async(req,res)=>{
    const {city}=req.query;
    const cacheData=await getAsync(city);
    if (cacheData) {
        const weatherData=JSON.parse(cacheData);
        return res.json(weatherData);
    }
    const apiurl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apikey}&units=metric`
    try{
        const reponse=await axios.get(apiurl);
        const {main,wind,weather}=response.data;
        const weatherData={
            temperature:main.temp, 
            humidity:main.humidity, 
            windspeed:wind.speed, 
            conditions:weather[0].description
        }
        await setexAsync(city, 1800, JSON.stringify(weatherData));
        res.json(weatherData)
    }catch(err){
        res.send({'msg':'Unable to fetch Weather Data'});
    }
})

module.exports={
    weatherRouter
}