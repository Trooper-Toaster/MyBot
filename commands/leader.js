const Discord = require("discord.js");

const mon = require("mongoose");
mon.connect("mongodb+srv://Troopers:fsxWOgZj94vaJiIk@hi-pn6gb.gcp.mongodb.net/HI?retryWrites=true&authSource=admin")
const Coins = require("../models/money.js");
exports.run = (bot, message, args) => {
   Coins.find({
     serverID: message.guild.id
   }).sort([
     ['money', 'descending']
           ]).exec((err, res) => {
     if(err) console.log(err);
   let embed = new Discord.RichEmbed()
     .setTitle("Leaderboard")
     
     if(res.length === 0) {
       embed.setColor("RED");
       embed.addFiled("No Data found")
     } else if (res.length < 10) {
                
      embed.setColor("GREEN");
     for (i = 0; i < res.length; i++) {
       let member = message.guild.members.get(res[i].userID) || "User left server"
       if(member === "User left server"){
         embed.addField(`${i + 1 }. ${member}`, `**COINS**: ${res[i].money}`);
       }else{
         embed.addField(`${i + 1}. ${member.user.username}`, `**COINS**: ${res[i].money}`);
     
   }
     }
     }else{
        embed.setColor("GREEN");
     for( i = 0; i < 10; i++) {
       let member = message.guild.members.get(res[i].userID) || "User left server"
       if(member === "User left server"){
         embed.addField(`${i + 1 }. ${member}`, `**COINS**: ${res[i].money}`);
       }else{
         embed.addField(`${i + 1}. ${member.user.username}`, `**COINS**: ${res[i].money}`);
     
   }
  }     
 }
    message.channel.send(embed) 
})
}
                   
module.exports.help = {
  
  name: "leaderboard"
  
}
