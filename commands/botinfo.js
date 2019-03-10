const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let bicon = bot.user.displayAvatarURL;
    let botinbed = new Discord.RichEmbed()
    .setDescription("Bot Infomation")
    .setColor("#d8261a")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botinbed);
  console.log(`${message.author} wanted botinfo`)
}


module.exports.help = {
  
  name: "botinfo"
  
}
