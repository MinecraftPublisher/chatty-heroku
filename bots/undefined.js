const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const https = require("https");
var updated = "";
client.login("undefined");
https.get("https://chatmaker.glitch.me");
function execute() {
  fs.readFile("list.txt", "utf8", function(err, contents) {
    var array = contents.split("''");
    array.forEach(element => {
      const bot = require("./bots/" + element);
    });
  });
  setTimeout(execute, 10000);
}
client.on("ready", () => {
  //SET ACTIVITY
  client.user.setActivity("!create for help");
  //saying I'M READY
  console.log(`Bot ID:${client.user.tag}`);
  setTimeout(execute, 10000);
});
client.on("message", msg => {
  if (msg.author.bot) {
  } else if (msg.content == "!create") {
    msg.reply(
      "This is not a valid use,you should use it like this:\n!create~TOKEN~NAME~CLIENTID\nOr you can use !truthdare~TOKEN~NAME~CLIENTID to create a truth or date bot."
    );
  } else if (msg.content.split("~")[0] == "!create") {
    var splat = msg.content.split("~");
    msg.channel.send("please wait until we create your bot...");
    fs.readFile("demo.txt", "utf8", function(err, contents) {
      updated = contents.replace("token123", splat[1]);
      updated = updated.replace("name123", splat[2]);
      updated = updated.replace("clientid", splat[3]);
      fs.writeFile("bots/" + splat[2] + ".js", updated, function(err) {
        fs.readFile("list.txt", "utf8", function(err, contentz) {
          fs.writeFile("list.txt", contentz + "''" + splat[2] + ".js", function(
            err
          ) {
            if (err == null) {
              msg.reply(
                "Success!\nUse this link to add your bot to your server:\nhttps://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" +
                  splat[3]
              );
            }
          });
        });
      });
    });
  } else if (msg.content.split("~")[0] == "!truthdare") {
    var splat = msg.content.split("~");
    msg.channel.send("please wait until we create your bot...");
    fs.readFile("truthdare.txt", "utf8", function(err, contents) {
      updated = contents.replace("token123", splat[1]);
      updated = updated.replace("name123", splat[2]);
      updated = updated.replace("clientid", splat[3]);
      fs.writeFile("bots/" + splat[2] + ".js", updated, function(err) {
        fs.readFile("list.txt", "utf8", function(err, contentz) {
          fs.writeFile("list.txt", contentz + "''" + splat[2] + ".js", function(
            err
          ) {
            if (err == null) {
              msg.reply(
                "Success!\nUse this link to add your bot to your server:\nhttps://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" +
                  splat[3]
              );
            }
          });
        });
      });
    });
  } else {
    msg.reply("do !create for help.");
  }
});
