const fs = require("fs");
const request = require('request');
const Discord = require('discord.js');

module.exports = {
  name: "dailyhoro",
  description: "Free Daily horoscope from *horoscopes-and-astrology.com*",
  async execute(message) {
    const args = message.content.split(" ");
  const sign = args[1];
    const url = "https://www.horoscopes-and-astrology.com/json";

    request(url, function(err, response, body) {
      if (err) {
        console.log(error);
      } else {
        let horoscopeArr = JSON.parse(body);
        let result;
    switch (sign) {
      case "aries":
      case "Aries":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Aries);
        break;
      case "taurus":
      case "Taurus":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Taurus);
        break;
      case "gemini":
      case "Gemini":
        result = result =(dailyhoroscope = horoscopeArr.dailyhoroscope.Gemini);
        break;
      case "cancer":
      case "Cancer":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Cancer);
        break;
      case "leo":
      case "Leo":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Leo);
        break;
      case "virgo":
      case "Virgo":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Virgo);
        break;
        case "libra":
      case "Libra":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Libra);
        break;
      case "scorpio":
      case "Scorpio":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Scorpio);
        break;
      case "sagittarius":
      case "Sagittarius":
        result = (dailyhoroscope = horoscopeArr.dailyhoroscope.Sagittarius);
        break;
      case "capricorn":
      case "Capricorn":
        result =(dailyhoroscope = horoscopeArr.dailyhoroscope.Capricorn);
        break;
      case "aquarius":
      case "Aquarius":
        result =(dailyhoroscope = horoscopeArr.dailyhoroscope.Aquarius);
        break;
      case "pisces":
      case "Pisces":
       result =(dailyhoroscope = horoscopeArr.dailyhoroscope.Pisces);
        break;
    }
  let n = result.search("<a");
  let res = result.slice(0, n);
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle(`${sign}`)
      // Set the color of the embed
      .setColor(0xFF8000)
      // Set the main content of the embed
      .setDescription(`${res}` +`\n *[${horoscopeArr.credit}](https://horoscopes-and-astrology.com)*`);
    // Send the embed to the same channel as the message
    message.channel.send(embed);
        
      }
    });
  },

  
};
