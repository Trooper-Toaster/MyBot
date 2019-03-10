const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Nope");
let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if(!rMember) return message.reply("Role a Member");
let role = args.join(" ").slice(22);
if(!role) return message.reply("What Role?");
let gRole = message.guild.roles.find(`name`, role);
if(!gRole) return message.reply("How bout a role that is real?");

if(rMember.roles.has(gRole.id)) return message.reply("They already have that role!");
await(rMember.addRole(gRole.id));


let froleimbed = new Discord.RichEmbed()
  .setDescription("Added Role")
  .setColor("#f4a142")
  .addField("Time", message.createdAt)
  .addField("Roled", rMember)
  .addField("Role", gRole)
  .addField("By", message.author);

  let frole = message.guild.channels.find(`name`, "modlog");
  if(!frole) return message.channel.send("Cant Find the ModLog");
 frole.send(froleimbed);
 message.channel.send(`Roled ${rMember} the ${gRole.name} Role`);

  return;
}


module.exports.help = {
  
  name: "addrole"
  
}
