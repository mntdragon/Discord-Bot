// export the function

/*client.on("guildMemberAdd", member => {
    member.send(`Oooh, You found the way to My Dream-land! 
    Please be aware that we won’t tolerate troll, spam or harassment. Have fun 😀`)
  });*/

  module.exports = (client, member) => {
    member.send(`Oooh, You found the way to My Dream-land!
     Please be aware that we won't tolerate troll, spam or harassment. Have fun 😀`)
  }