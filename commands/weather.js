const request = require('request');
const {WEATHER_API} = require("../config.json");
module.exports = {
	name: 'weather',
	description: 'Get current weather of city name/zip code (FI) \n !weather city + <name>\n !weather zip <zipcode>',
	async execute(message){
  const args = message.content.split(" ");
  let url;
  let boo = true;
  
  if(args[1] == 'city'){
    url = 'http://api.openweathermap.org/data/2.5/weather?q=' + args[2] +',fi&units=metric&appid='+ api;
  }
  else if(args[1] == 'zip'){
    url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + args[2] +',fi&units=metric&appid='+ api;
  }
 else{
    boo = false;
 }

 if(boo == true){

 request(url, function (err, response, body) {
  if(err){
    console.log(error);
  } else {
    let weather = JSON.parse(body);
    
    let msg = `It's ${weather.main.temp} °C in ${weather.name} - ${weather.weather[0].description}. \n Max temp: ${weather.main.temp_max} - Min temp: ${weather.main.temp_min}. \n Wind: ${weather.wind.speed} meter/sec`;
    message.reply(msg);           
  }
});

 }


  },
}
