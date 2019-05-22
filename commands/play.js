const { Util } = require("discord.js");
const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Play a song",
  async execute(message) {
    const args = message.content.split(" ");
    const queue = message.client.queue;
    const serverQueue = message.client.queue.get(message.guild.id);

    // check if user is in a voice chat + if the bot has the right permission
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel)
      return message.channerl.send("Hit a voice channel to play music !");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "Permissions are needed to join and speak in voice channel !"
      );
    }

    //get the song info and save into a song object by ytdl library which get songs info from youtube link
    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };

    // before create a contract to add song to queue, check if serverQueue is already defined = music i salready playing
    // if playing, add song an existing serverQueue and sned success msg
    // if not, create serverQueue and try to join the voice channel, start play music
    if (!serverQueue) {
      // create the contract for queue
      const queueContract = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };
      // set the queue by contract
      queue.set(message.guild.id, queueContract);
      // push song to songs array
      queueContract.songs.push(song);

      try {
        // here to try to join the voicechat and save connection into object
        var connection = await voiceChannel.join();
        queueContract.connection = connection;
        // start song
        this.play(message, queueContract.songs[0]);
      } catch (err) {
        // if the bot fails to join the voicechat, send error
        console.log(err);
        queue.delete(message.guild.id);
				return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      return message.channel.send(`${song.title} has been added to the queue!`);
    }
  },

  // checks if the song is empty
  // If so we will just leave the voice channel and delete the queue.
  play(message, song) {
    const queue = message.client.queue;
    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    // after that, start playing song with playStream function and URL of our song
    // this is a recursive function = call itself over and over again = play the next song when the song is finished
    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", () => {
        console.log("Music ended !");
        // Delete the finished song from the queue
        serverQueue.songs.shift();
        // call the PLAY() again with next song
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", error => {
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  }
};
