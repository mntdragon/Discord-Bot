// export the function

/*client.on("guildMemberAdd", member => {
    "Welcome @#$, we hope you will enjoy staying in @server ",
  });*/
  const Discord = require('discord.js');
  const greetings = require("../data/greetings")
    module.exports = (client, member) => {
     let user = member.user.username;
  let server = member.guild.name;
  let count = member.guild.memberCount;
  let discriminator = member.user.discriminator;
  
  let welcome = greetings[Math.floor(Math.random() * greetings.length)];
  welcome = welcome.replace('@', user)
  welcome = welcome.replace('@server', server)
  welcome = welcome.replace('-', count)
  welcome = welcome.replace('$', discriminator)
  
  let welcomeFinal = `Welcome to the server, ${member} \n \n` + welcome;
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  if (!channel) return;
    setTimeout(function() {
  member.createDM().then(function () {
  
      let welcomeembed = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setDescription(welcomeFinal)
      .setThumbnail('https://i.imgur.com/nq2xkRj.jpg')
  return channel.send(welcomeembed) 
   }).catch(console.error)
   },100);
  
    }