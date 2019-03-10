const Discord = require("discord.js");

const mon = require("mongoose");
mon.connect("mongodb+srv://Troopers:fsxWOgZj94vaJiIk@hi-pn6gb.gcp.mongodb.net/HI?retryWrites=true&authSource=admin")
const Money = require("../models/money.js");
exports.run = (bot, message, args) => {
   Money.findOne({
     userID: message.author.id,
     serverID: message.guild.id
   }, (err, money) => {
     if(err) console.log(err);
     
     let embed = new Discord.RichEmbed()
     .setTitle("Coins")
     .setColor("BLUE");
     if(!money){
       embed.addField("Coins", "0", true);
        return message.channel.send(embed);
     } else{
       embed.addField("Coins", money.money, true);
       return message.channel.send(embed);
       
     }
   })
     
  
  
  
}


module.exports.help = {
  
  name: "coins"
  
}
