// similar to skipping, except, clear songs array,
// bot delete the queue and leave the voice chat
module.exports = {
  name: "stop",
  description: "Stop all songs in the queue!",
  execute(message) {
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!message.member.voiceChannel)
      return message.channel.send(
        "Hit a voice channel to stop the music!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};
