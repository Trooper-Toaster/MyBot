const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 let bUser = message.guild.member(message.mentions.users.first() || message.guild.get(args[0]));
if(!bUser) return message.channel.send("Cant Find user");
let breason = args.join(" ").slice(22);
if(!message.member.hasPermission("BAN_MEMBERS")) return message.send("Nice Try")
if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Can't ban other Mods")

let banembed = new Discord.RichEmbed()
.setDescription(`🔨**Banned** User: ${bUser} \n 📄**Reason**: ${breason}`)
.setColor("#e09d0e")
  .setThumbnail(bUser.displayAvatarURL)

.asetAuthor(message.author.username);


let kickChannel = message.guild.channels.find(`name`, "modlog")
if(!kickChannel) return message.channel.send("Cant Find the ModLog")

message.guild.member(bUser).ban(breason);
kickChannel.send(banembed);
bUser.sendMessage(`You have been banned for ${breason}`);



  return;
}


module.exports.help = {
  
  name: "ban"
  
}
