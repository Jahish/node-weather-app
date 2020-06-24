const request = require('request');


const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=c027eb04ef8f9b1a62560596cc119d2b';

    request({url: url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(response.body.message){
            callback('Unable to find the weather for the location', response.body.error);
        }else{
            callback(undefined, `${response.body.weather[0].description}. It is currently ${response.body.main.temp} F. The humudity is ${response.body.main.humidity}`);
        }
    })
}

module.exports = forecast;