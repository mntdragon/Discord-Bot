//import all our dependencies

// to work with files
const fs = require('fs')

// read all files of the events folder by fs.readdir
fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    //get rid of extenstion, ex,ready.js instead of just ready
    const eventName = file.split('.')[0]
    // spread operator / when take more than 1 argument
    client.on(eventName, (...args) => eventHandler(client, ...args))

  })
});
const Discrod = require("discord.js");

const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");

//create client and login using our token
const client = new Discrod.Client();

// create a map with the name of the queue where we save all the songs we type in the chat
const queue = new Map();

client.once("ready", () => {
  console.log("Ready!");
  // get a list of servers the bot connecting to
  console.log("Servers:");

  client.guilds.forEach(guild => {
    console.log(" - " + guild.name);

    // List all channels
    guild.channels.forEach(channel => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
  });

});
client.once("reconnecting", () => {
  console.log("Reconnecting");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});


// READING chat messages
client.on("message", async message => {
  // Prevent bot from responding to its own messages
  if (message.author.bot) return;
  // RESPOND
  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}ping`)) {
    message.reply("Pong!");
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }

});


/*
// check if the message is from our own bot and ignore it if it is
    if (message.author.bot) return;
// check if the message starts with the prefix (in config.json) and return if it does not
    if (!message.content.startsWith(prefix)) return;
*/

// ADDING songs

// check if user is in a voice chat + if the bot has the right permission
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  //get the song info and save into a song object by ytdl library which get songs info from youtube link
  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  // before creatte a contract to add song to queue, check if serverQueue is already defined = music i salready playing
  // if playing, add song an existing serverQueue and sned success msg
  // if not, create serverQueue and try to join the voice channel, start play music
  if (!serverQueue) {
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }

  // create the contract for queue
  const queueContract = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    cnnection: null,
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
    play(message.guild, queueContract.songs[0]);
  } catch (err) {
    // if the bot fails to join the voicechat, send error
    console.log(err);
    queue.delete(message.guild.id);
    return message, channel.send(err);
  }
}
// checks if the song is empty
// If so we will just leave the voice channel and delete the queue.
function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  // after that, start playing song with playStream function and URL of our song
  // this is a recursive function, so it cal itself over and over again = play the next song when the song is finished
  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", () => {
      console.log("Music ended !");
      // Deöete the finished song from the queue
      serverQueue.songs.shift();
      // call the PLAY() again with next song
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => {
      console.error(error);
    });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}
// SKIPPING songs
function skip(message, serverQueue) {
  if (!message.member.voiceChannel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

// STOPPING songs
// similar to skipping, except, clear songs array, bot delete the queue and leave the voice chat
function stop(message, serverQueue) {
  if (!message.member.voiceChannel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

client.login(token);
