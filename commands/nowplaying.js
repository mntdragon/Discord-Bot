module.exports = {
	name: 'nowplaying',
	description: 'Get playing song.',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('No song is being played.');
		return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
	},
};