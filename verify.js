const Discord = require("discord.js")
const rbx = require("roblox-js")
exports.run = (bot, message, args) => {
    let verifiedRole = message.guild.roles.find(r => r.name === "Member")
   if (message.member.roles.has(verifiedRole)) return message.channel.send("You are already verified.")

    let rolew = message.guild.roles.find(r => r.name === "unverified");
                                    message.member.removeRole(rolew);
  let roflew = message.guild.roles.find(r => r.name === "Member");
                                    message.member.addRole(roflew);
  message.channel.send("Done!");
}


module.exports.help = {
  
  name: "verify"
  
}
