const Discord = require('discord.js');
 module.exports = (client, member) => {
 
 const channel = member.guild.channels.find(ch => ch.name === 'general');

   setTimeout(function() {
member.createDM().then(function () {
    let farewell = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setDescription(`${member} left this server.`)
    .setThumbnail('https://i.imgur.com/3yuD5Pi.jpg?1')
return channel.send(farewell) 
 }).catch(console.error)
 },100);

 }