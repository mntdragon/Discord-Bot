// export the function

module.exports = client => {
  console.log(`Logged in as ${client.user.tag}!`) <
    // get a list of servers the bot connecting to
    console.log("Servers:");

  client.guilds.forEach(guild => {
    console.log(" - " + guild.name);

    // List all channels
    guild.channels.forEach(channel => {
      console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
    });
  });
};
