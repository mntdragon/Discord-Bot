const fs = require('fs')

module.exports = {
	name: 'ping',
	description: 'Test the bot',
	execute(message) {
		message.channel.send('Pong!');
	},
};