// import express from "express";
// import path from "path";
// import weatherData from "../utils/WeatherData.js";

const express = require("express");
const path = require("path");
const weatherData = require("../utils/WeatherData.js");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


const port = 3000 ; 
// const port =process.env.PORT || 3000 ; 


app.get("/" , (req , res)=>{
    res.render("index.ejs");
});
app.get("/ui" , (req , res)=>{
    
    res.render("ui.ejs"  , {desc : "" , temp:"" , icon:"" , name:""});
});
app.post("/ui" , (req , res)=>{

    if(req.body["address"] == null){

        
        res.send("Pleae enter an adress");
    }else{
        // res.send(req.query.address);
        weatherData(req.body["address"] , (error , result) =>{
            if(error){
                res.send(error);
            }
            else{
                if (result.cod == 200) {
                let weatherIcon ="";
                if (
                    result.weather[0].description == "rain" ||
                    result.weather[0].description == "fog"
                  ) {
                    weatherIcon= "wi wi-day-" + result.description;
                  } else {
                    weatherIcon = "wi wi-day-cloudy";
                  }
                let c =   Math.floor( result.main.temp - 273.15) ;
                    res.render("ui.ejs" ,{desc : result.weather[0].description , temp:c  , icon:weatherIcon , name:result.name});
                    // res.send( result);
                }else{
                    res.render("ui.ejs" ,{desc : "" , temp:""  , icon:"" , name:"City Not Found"});

                }
            
            }
        })
    }


});
app.get("/weather" , (req , res)=>{
    if(req.query.address == null){

        
        res.send("Pleae enter an adress");
    }else{
        // res.send(req.query.address);
        weatherData(req.query.address , (error , result) =>{
            if(error){
                res.send(error);
            }
            else{
                
                let c =   Math.floor( result.main.temp - 273.15) ;
                    // res.render("weather.ejs" ,{desc : result.weather[0].description , temp:c });
                    res.send( result);
                }
        })
    }
});


app.get("*" , (req , res)=>{
    res.send("This Route Doesn't Exist");
});

app.listen(port , ()=>{
    console.log("Running on "+port);
})