const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Need to be a mod");
    if(!args[0]) return message.send("Proper Format Please");
    
    let pollEmbed = new Discord.RichEmbed()
    .setColor('#77f442')
    .setFooter("React to vote!")
    .setDescription(`Poll Asked By ${message.author.username}`)
    .setTitle(args.join(' '));
    
    
    let pollchannel = message.guild.channels.find(`name`, "polls");
    
    let send = await pollchannel.send(pollEmbed);
    pollchannel.send("@here");
    
    send.react('✅');
    send.react('🚫');
}


module.exports.help = {
  
  name: "poll"
  
}
