const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nope");
let qMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!qMember) return message.reply("Role a Member");
let role = args.join(" ").slice(22);
if(!role) return message.reply("What Role?");
let tRole = message.guild.roles.find(`name`, role);
if(!tRole) return message.reply("How bout a role that is real?");

if(qMember.roles.has(tRole.id));
await(qMember.removeRole(tRole.id));


let roleimbed = new Discord.RichEmbed()
  .setDescription("Removed Role")
  .setColor("#f4a142")
  .setThumbnail(qMember.displayAvatarURL)
  .addField("Time", message.createdAt)
  .addField("Who", qMember)
  .addField("Removed", tRole)
  .addField("By", message.author);

  let frole = message.guild.channels.find(`name`, "modlog");
  if(!frole) return message.channel.send("Cant Find the ModLog");
 frole.send(roleimbed);
 message.channel.send(`Removed ${qMember} ${tRole.name} Role`);


  return;
}


module.exports.help = {
  
  name: "removerole"
  
}
