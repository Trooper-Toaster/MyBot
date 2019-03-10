const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const mon = require("mongoose");
mon.connect("mongodb+srv://Troopers:fsxWOgZj94vaJiIk@hi-pn6gb.gcp.mongodb.net/HI?retryWrites=true&authSource=admin")
const Warn = require("../models/warn.js");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
let kicks = JSON.parse(fs.readFileSync("./kicks.json", "utf8"));
module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription(`⚠**Warned** User: ${wUser} \n 📄**Reason**: ${reason} \n 📋**Warnings**: ${warns[wUser.id].warns}`)
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .setThumbnail(wUser.displayAvatarURL)
 .setFooter("Breezy Bot", bot.user.displayAvatarURL)
  
   

  let warnchannel = message.guild.channels.find(`name`, "modlog");
  if(!warnchannel) return message.reply("Couldn't find channel");
message.channel.send(warnEmbed);
  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "200s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).kick(reason);
    message.reply(`<@${wUser.id}> has been kicked.`);
    warns[wUser.id] = {
    warns: 0
  };
    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
     if(!kicks[wUser.id]) kicks[wUser.id] = {
    kicks: 0
       
  };

  kicks[wUser.id].kicks++;

  fs.writeFile("./kicks.json", JSON.stringify(kicks), (err) => {
    if (err) console.log(err);
        if(kicks[wUser.id].kicks == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`);
    kicks[wUser.id] = {
    kicks: 0
      
  };
    
  
  }
    
  });
  }
}
               

               
module.exports.help = {
  name: "warn"
}
