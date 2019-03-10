const Discord = require("discord.js");
const mongoose = require("mongoose");
const Money = require("./models/money.js");
mongoose.connect("mongodb+srv://Troopers:fsxWOgZj94vaJiIk@hi-pn6gb.gcp.mongodb.net/HI?retryWrites=true&authSource=admin");
const fs = require("fs");
const serverStats = {
  guildID: '534061084693495808',
  totalUsersID: '547028120159649792',
  memberCountID: '547028183795499019',
  botCountID: '547028232583512066'
};
  
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => { 

  
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  
  if(jsfile.length <= 0){
    console.log("Cant find any commands");
    return;
}
  
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
});
});
bot.on("ready",
       
       
       async () => {
  console.log(`${bot.user.username} is online in ${bot.guilds.size} servers`);
  bot.user.setActivity('SortaScript', { type: 'LISTENING' });
});
bot.commands = new Discord.Collection();






 
bot.on("message", async message=> {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "/";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  
if (message.content.startsWith(prefix)) {
  
} else {
  let coinstoadd = Math.ceil(Math.random() * 50);
  console.log(coinstoadd + " coins");
  Money.findOne({
    userID: message.author.id,
    serverID: message.guild.id
  }, (err, money) => {
    if(err) console.log(err);
    if(!money){
      const newMoney = new Money({
        _id: mongoose.Types.ObjectId(),
        userID: message.author.id,
        serverID:message.guild.id,
        money: coinstoadd
      })
      newMoney.save().catch(err => console.log(err))
    }else{
      money.money = money.money + coinstoadd;
      money.save().catch(err => console.log(err));
    }
  })
  
};

if(cmd === "toaster"){
message.channel.send("is the best scripter")

  return;
}
   let blacklisted = ["nigg"] //words put , after the word
   
     let foundInText = false;
  for (var i in blacklisted) { // loops through the blacklisted list
    if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
  }
 
    if (foundInText) {
      message.delete();
      message.channel.sendMessage('Hey!!')
  }


if(cmd === "bangles"){
message.channel.send("is the best begger")

  return;
}
});


bot.on('guildMemberAdd', member => {
  console.log('User' + member.user.tag + 'has joined the server!');

  var roles = member.guild.roles.find('name', 'unverified');
  member.addRole(roles);
  member.sendMessage("Thanks for joing the Breezy Discord!");
  if(member.guild.id !== serverStats.guildID) return;
  
  
  bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
  bot.channels.get(serverStats.memberCountID).setName(`Total Members: ${member.guild.members.filter(m => !m.user.bot).size}`);
  bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);
   let channelss= member.guild.channels.find(`name`, "welcome");
   
  
  let joinEmbed = new Discord.RichEmbed()
  .setTitle("Player Joined")
  .setThumbnail(member.displayAvatarURL)
  .setDescription(`${member} joined`)
  .setFooter(`Say /verify to get roles`);
   channelss.send(joinEmbed);
 
  
});


bot.on('guildMemberRemove', member => {
  member.sendMessage("Thanks for leaving the Breezy Discord!");
  bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
  bot.channels.get(serverStats.memberCountID).setName(`Total Members: ${member.guild.members.filter(m => !m.user.bot).size}`);
  bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`);
     let channelsss= member.guild.channels.find(`name`, "general")
   
   channelsss.send(`${member} has left the server`);
  
});

bot.on('messageDelete', message => {
  
  
  
  let deleteEmbed = new Discord.RichEmbed()
.setDescription("Message Deleted")
.setColor("#000000")
  .setThumbnail(message.author.displayAvatarURL)
  .setAuthor("Breezy Bot")
.addField("Message Content", message.content)
  .addField("Message Deleted By", message.author.username)
  .addField("In Channel", message.channel.name);
  
message.guild.channels.find(`name`, "modlog").send(deleteEmbed);
});
bot.on('messageUpdate', (oldMessage, newMessage) => {
  console.log(oldMessage.content);
  console.log(newMessage.content);
  
   let editEmbed = new Discord.RichEmbed()
.setDescription("Message Edit")
.setColor("#f442e8")
   .setThumbnail(newMessage.author.displayAvatarURL)
  .setAuthor("Breezy Bot")
.addField("Original", oldMessage.content)
  .addField("Current", newMessage.content)
  .addField("In Channel", newMessage.channel.name);
  
oldMessage.guild.channels.find(`name`, "modlog").send(editEmbed);
  
  
});
bot.login(process.env.TOKEN);

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 50000);
