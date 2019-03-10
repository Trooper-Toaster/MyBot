const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let sicon = message.guild.displayAvatarURL;
  let serverinbed = new Discord.RichEmbed()
  .setDescription("Server Info")
  .setColor("#5fe00f")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("You Joined", message.member.joinedAt)
  .addField("Total Members", message.guild.memberCount);

  return message.channel.send(serverinbed);
  console.log(`${message.author} requested serverinfo`)

}


module.exports.help = {
  
  name: "serverinfo"
  
}
