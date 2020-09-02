const https = require("https");
const Discord = require("discord.js");
const client = new Discord.Client();
var fs = require("fs");
var path = require("path");
const fetcher = require("node-fetch");
var msgend = true;
var message = null;
var clid = "hello";
var tkn = "hello";
var name = "hello";
var welcome =
  "Hello,I'm " +
  name +
  ",and i like to text.\nget help by saying " +
  name +
  " help or mentioning me and saying help like <@!?" +
  clid +
  "> help";
var help =
  "List of my commands:\nping -> Get ping latency\ninvite -> Add me to your server!\nsupport -> Support me!\n";
//Dynamic statuses
var statuses = [
  "Made with chatmaker",
  "Popcorns!",
  "Made by mforoud86#5928",
  "I'm " + name,
  "Racoons here :|"
];
var switcher = 0;
var avatar = [
  "https://cdn.glitch.com/87561600-daff-442a-ad8d-5f9d0693f3dd%2Flatest.png?v=1597488034751",
  "https://cdn.glitch.com/87561600-daff-442a-ad8d-5f9d0693f3dd%2FPngItem_2911909.png?v=1597488470437",
  "https://cdn.glitch.com/87561600-daff-442a-ad8d-5f9d0693f3dd%2F1597257875.6277618-FC6CEE6E-436A-4904-B350-27643056FCFB.PNG?v=1597488476962"
];
function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
var servcount = NaN;
//Login and stuff
client.login(tkn);
function updatestatus() {
  if (switcher == 0) {
    client.user.setActivity("starting...");
  } else {
    client.user.setActivity(statuses[(switcher % statuses.length) - 1]);
  }
  switcher = switcher + 1;
  setTimeout(updatestatus, 2000);
}
function status() {
  return "Spotify";
}
//filterr.addWords(bad.words);
function clean(text, message) {
  const prefix = name;

  const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content
    .slice(matchedPrefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();
  return command;
}
client.on("ready", () => {
  //SET ACTIVITY
  updatestatus();
  //saying I'M READY
  console.log(`Bot ID:${client.user.tag}`);
});
client.on("guildCreate", guild => {
  servcount = client.guilds.cache.size;
  //send this when bot added to a server
  try {
    //Ban check
    if (fs.existsSync("banz/" + guild.id)) {
      guild.leave();
    }
    //Welcome messages
    guild.channels.cache.find(ch => ch.name === "general").send(welcome);
    guild.channels.cache.find(ch => ch.name === "welcome").send(welcome);
  } catch {}
});
function respond() {
  var msg = message;
  servcount = client.guilds.cache.size;
  //Check if some random person is sending DMs
  if (msg.channel.type === "dm") {
    if (msg.author.bot) {
      return;
    } else {
      msg.reply(
        "I will only answer to messages sent to Servers.\nIf you have a server and you  want me there,use this link to add me to that server.\nAlso good ghost 👻 is watching you!\nhttps://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" +
          clid
      );
    }
  } else {
    if (msg.author.bot) {
      return;
    } else {
      if (between(1, 500) == 1) {
        var number = between(1, avatar.length - 1);
        msg.reply(
          "You've encountered the super rare moment number " + number + "!"
        );
        client.user.setActivity("Super rare moment", { type: "WATCHING" });
        client.user.setAvatar(avatar[number]);
      } else {
      }
      if (clean(msg.content.toLowerCase(), msg) == "null") {
        return;
      }
      //Blockin' out people?
      else if (
        fs.existsSync("banz/" + msg.author) &&
        msg.author.tag != "Mforoud86#5928"
      ) {
      } else {
        var test = clean(msg.content.toLowerCase(), msg).match(/:(.*):/);
        //Check if bot activated or not
        if (2 + 2 == 4) {
          //Check if the message was sent from bot
          if (msg.author.bot) {
            return;
          }
          //Doing keepup
          else if (clean(msg.content.toLowerCase(), msg) == "support") {
            msg.channel.send(
              "Due to the hosting restrictions of " +
                name +
                ",\n" +
                name +
                " would turn off once in a while.\nYou can support it by clicking on this link and waking up " +
                name +
                ".\nhttps://chatmaker.glitch.me"
            );
          }
          //Pingggggggggg
          else if (clean(msg.content.toLowerCase(), msg) == "ping") {
            msg.channel.send("Pinging...").then(sent => {
              sent.edit(
                "```" +
                  `Success! ✅ \nTook ${sent.createdTimestamp -
                    msg.createdTimestamp}ms` +
                  "```"
              );
            });
          }
          //Gotta do erase learn
          else if (clean(msg.content.toLowerCase(), msg).includes("forget")) {
            if (msg.author.tag == "Mforoud86#5928") {
              fs.unlink("learns/" + msg.content.split("|")[1], function() {
                msg.reply("i forgot it.");
              });
            } else {
              msg.reply("ERROR");
            }
          }
          //Gotta do like ban user or whatever :|
          else if (clean(msg.content.toLowerCase(), msg).includes("ban")) {
            if (msg.author.tag == "Mforoud86#5928") {
              fs.writeFile(
                "banz/" + msg.mentions.users.first().id,
                msg.mentions.users.first().tag,
                function() {
                  msg.reply("banned.");
                }
              );
            } else {
              msg.reply("ERROR");
            }
          }
          //Gotta like unban
          else if (clean(msg.content.toLowerCase(), msg).includes("unban")) {
            if (msg.author.tag == "Mforoud86#5928") {
              fs.unlink("banz/" + msg.mentions.users.first().id, function() {
                msg.reply("unbanned.");
              });
            } else {
              msg.reply("ERROR");
            }
          }
          //Info message
          else if (clean(msg.content.toLowerCase(), msg) == "info") {
            msg.channel.send(msg.author.id);
          } else if (clean(msg.content.toLowerCase(), msg) == "help") {
            msg.channel.send(help);
          } //LOL
          /*else if (clean(msg.content.toLowerCase(), msg) == "activate") {
            msg.reply("already activated!");
          }
          //Deactivation
          else if (clean(msg.content.toLowerCase(), msg) == "deactivate") {
            //Checking if the guy admin
            if (msg.member.hasPermission("ADMINISTRATOR")) {
              fs.unlink("activates/" + msg.channel.id, function(err) {
                msg.channel.send("See you later :(");
              });
            } else {
              msg.reply("Only a true admin would be able to put me to sleep!");
            }
          }*/
          else if (clean(msg.content.toLowerCase(), msg) == "leave") {
            if (msg.member.hasPermission("ADMINISTRATOR")) {
              fs.unlink("activates/" + msg.channel.id, function(err) {
                msg.reply(
                  "I WILL LEAVE!!!\nBut " +
                    name +
                    " 👻  is watching you forever!ever!ever!ever!"
                );
              });
              msg.guild.leave();
            } else {
              msg.reply("Only a true admin would be able to kick me out!");
            }
          } else if (clean(msg.content.toLowerCase(), msg) == "servers") {
            msg.channel.send(
              "I am currently in **" + client.guilds.cache.size + "** Servers."
            );
          }
          //Get invite link
          else if (clean(msg.content.toLowerCase(), msg) == "invite") {
            msg.channel.send(
              "Use this link to add me to your server:\nhttps://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" +
                clid
            );
          }
          //DA REAL CODE
          else {
            //Check if the user is teaching da bot
            if (fs.existsSync("teachers/" + msg.author)) {
              //Guy canceled learning
              if (clean(msg.content.toLowerCase(), msg) == "nothing") {
                fs.unlink("teachers/" + msg.author, function(err) {
                  if (err == null) {
                    msg.channel.send("Ohkay 🥺");
                  }
                });
              } else {
                //THIS GUY IS TEACHING MY BOT
                /*if (regex.test(clean(msg.content.toLowerCase(), msg)) == true) {
                msg.channel.send("I hate emojis 😛");
              } else {*/
                fs.readFile("teachers/" + msg.author, "utf8", function(
                  err,
                  data
                ) {
                  fs.writeFile(
                    "learns/" + data,
                    clean(msg.content.toLowerCase(), msg),
                    function(err2) {
                      fs.unlink("teachers/" + msg.author, function(err) {
                        if (err == null) {
                          msg.channel.send("Thx!");
                        }
                      });
                    }
                  );
                });
              }
              //}
            } else {
              //This guy has already teached or not teached...
              fs.readFile(
                "learns/" + clean(msg.content.toLowerCase(), msg),
                "utf8",
                function(err2, data2) {
                  if (err2 == null) {
                    msg.channel.send(data2);
                  } else {
                    fs.writeFile(
                      "teachers/" + msg.author,
                      clean(msg.content.toLowerCase(), msg),
                      function() {}
                    );
                    msg.reply(
                      '```What shall i respond?(Say "Nothing" to cancel)```'
                    );
                  }
                }
              );
            }
          }
        }
        //HELP
        else if (msg.content == "help") {
          msg.channel.send(help);
        }
        //Activate the bot
        /*else if (msg.content == "activate") {
          if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.reply("Only a true admin would be able to wake me up!");
          } else {
            fs.writeFile(
              "activates/" + msg.channel.id,
              "Activated",
              function() {
                msg.reply("Thanks for activating me!");
              }
            );
          }
        }*/
      }
    }
  }
  msg.channel.stopTyping();
}
function untype() {
  message.channel.stopTyping();
}
client.on("message", msg => {
  message = null;
  message = msg;
  if (fs.existsSync("activates/" + msg.channel.id)) {
    msg.channel.startTyping();
  }
  let n = parseInt(msg.content.length);
  setTimeout(respond, 200);
  setTimeout(untype, 1000);
});
