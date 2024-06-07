// import request  from "request";

const request = require("request");

const openWeatherapp     = {
    BASE_URL : "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY:"d4ffd15e5f6358fc24d5623cdc93b05e"
}


const weatherData = (address , callback)=>{
    const url = openWeatherapp.BASE_URL + encodeURIComponent(address) +"&APPID=" +openWeatherapp.SECRET_KEY;

    console.log(url);
    request({url , json:true } , (error , data)=>{
        if(error){
            callback(true , "Could'nt Fetch Data , Please Try Again , Error: "+ error);
        }
        callback(false  , data?.body);
    });
}


module.exports = weatherData;