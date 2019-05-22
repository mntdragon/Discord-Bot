module.exports = {
	name: 'skip',
	description: 'Skip a song!',
	execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!message.member.voiceChannel)
        return message.channel.send(
          "Hit voice channel to stop the music!"
        );
      if (!serverQueue)
        return message.channel.send("No more song to skip now!");
      serverQueue.connection.dispatcher.end();
    },
};