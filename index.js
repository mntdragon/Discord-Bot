/* ------------------------------------------------------------------*/
/* -------------import all our dependencies--------------------------*/

// to work with files
const fs = require("fs");

// read all files of the events folder by fs.readdir
fs.readdir("./events/", (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`);
    //get rid of extenstion, ex,ready.js instead of just ready
    const eventName = file.split(".")[0];
    // spread operator / when take more than 1 argument
    client.on(eventName, (...args) => eventHandler(client, ...args));
  });
});

const Discord = require("discord.js");
const YouTube = require("simple-youtube-api");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
const path = require("path");
const Client = require("./client.js");
const client = new Client();

client.commands = new Discord.Collection();

const queue = new Map();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('This is Music Bot');
  res.end();
}).listen(3000);

/* ------------------------------------------------------------------*/

client.once("warn", () => {
  console.warn;
});
client.on('error', () => {
  console.error;
});
client.once("reconnecting", () => {
  console.log("Reconnecting");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

// READING chat messages
client.on("message", async message => {
  //create an seperte argu array
  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  // Prevent bot from responding to its own messages
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {
    command.execute(message);
  } catch (error) {
    console.error(error);
    message.reply("There was an error trying to execute that command!");
  }
});

client.login(token);

const { parse } = require('url')

module.exports = (req, res) => {
  const { query } = parse(req.url, true)
  const { name = 'World' } = query
  res.end(`Hello ${name}!`)
}

