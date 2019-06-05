const fs = require('fs')
const quotes = require("../data/quotes")

module.exports = {
	name: 'fortune',
	description: 'Random fortune cookie quote',
	async execute(message){
    
  const index = Math.floor(Math.random() * quotes.length);
  message.channel.send(message.author.toString() + ': ' +  quotes[index]);

  },
}