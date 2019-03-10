const Discord = require("discord.js");
const fs= require("fs");

module.exports.run = async (bot, message, args) => {
   let iMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!iMember) return message.reply("Get Info for a member");
   let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
let kicks = JSON.parse(fs.readFileSync("./kicks.json", "utf8"));
   if(!warns[iMember.id]) warns[iMember.id] = {
    warns: 0
  };
   if(!kicks[iMember.id]) kicks[iMember.id] = {
    kicks: 0
  };
  let infoEmbed = new Discord.RichEmbed()
    .setDescription("User Info")
  .setColor("#f4df42")
  .addField("User Requested", iMember)
  .addField("Discord ID", iMember.id)
  .addField("Joined At", iMember.joinedAt)
  .addField("Server Nickname", iMember.nickname)
  .setThumbnail(iMember.avatarURL)
    .addField("Number of Warnings", warns[iMember.id].warns)
  .addField("Number of Kicks", kicks[iMember.id].kicks)
  .addField("Highest Roles", iMember.highestRole);
  
  
  message.channel.send(infoEmbed)
}


module.exports.help = {
  
  name: "info"
  
}
