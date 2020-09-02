const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const https = require("https");
var code = ["new", "1"];
var updated = "";

client.login("NzQ5MTMzNDgzNzI0NjM2MjQw.X0ni7A.y2k6JnI-auEsDGU9vtF2iE_IoKk");
const restart = require("./server.js");
function execute() {
  const restart = require("./server.js");
  fs.readFile("list.txt", "utf8", function(err, contents) {
    var array = contents.split("''");
    array.forEach(element => {
      const bot = require("./bots/" + element);
    });
  });
  setTimeout(execute, 2000);
}
function credit(message) {
  fs.readFile("money/" + message.author.tag, "utf8", function(err, contents) {
    if (err == null && contents != null && contents != 0) {
      fs.writeFile("money/" + message.author.tag, contents - 1, function(err) {
        process(message, message.author.tag);
      });
    } else {
      message.reply(
        "Hello! i see that you are eager to make your bot!\nSorry,but if you want to make a bot,use the !charge~NITRO_GIFT_URL command and charge the bot.charging may take a while to activate,cause the owner may not be online.\nSending a nitro classic will result in a bot,and a nitro will result in 3.\nall values are in month,not year."
      );
    }
  });
}
client.on("ready", () => {
  //SET ACTIVITY
  client.user.setActivity("!create for help");
  //saying I'M READY
  console.log(`Bot ID:${client.user.tag}`);
  setTimeout(execute, 2000);
});
function process(msg, verifiedornot) {
  if (msg.author.bot) {
    return;
  } else if (msg.content.split("~")[0] == "!create") {
    if (verifiedornot === msg.author.tag) {
      var splat = msg.content.split("~");
      msg.channel.send("please wait until we create your bot...");
      fs.readFile("demo.txt", "utf8", function(err, contents) {
        updated = contents.replace("token123", splat[1]);
        updated = updated.replace("name123", splat[2]);
        updated = updated.replace("clientid", splat[3]);
        fs.writeFile("bots/" + splat[2] + ".js", updated, function(err) {
          fs.readFile("list.txt", "utf8", function(err, contentz) {
            fs.writeFile(
              "list.txt",
              contentz + "''" + splat[2] + ".js",
              function(err) {
                if (err === null) {
                  msg.reply(
                    "Success!\nUse this link to add your bot to your server:\nhttps://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" +
                      splat[3]
                  );
                }
              }
            );
          });
        });
      });
    }
  } else if (msg.content.split("~")[0] == "!truthdare") {
    if (verifiedornot === msg.author.tag) {
      var splat = msg.content.split("~");
      msg.channel.send("please wait until we create your bot...");
      fs.readFile("truthdare.txt", "utf8", function(err, contents) {
        updated = contents.replace("token123", splat[1]);
        updated = updated.replace("name123", splat[2]);
        updated = updated.replace("clientid", splat[3]);
        fs.writeFile("bots/" + splat[2] + ".js", updated, function(err) {
          fs.readFile("list.txt", "utf8", function(err, contentz) {
            fs.writeFile(
              "list.txt",
              contentz + "''" + splat[2] + ".js",
              function(err) {
                if (err === null) {
                  msg.reply(
                    "Success!\nUse this link to add your bot to your server:\nhttps://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=" +
                      splat[3]
                  );
                }
              }
            );
          });
        });
      });
    }
  } else {
    msg.reply("unknown command,do !create for help.");
  }
}
client.on("message", msg => {
  if (!msg.author.bot) {
    if (
      msg.content.split("~")[0] === "!give" &&
      msg.author.tag == "Mforoud86#5928"
    ) {
      var splter = msg.content.split("~");
      msg.reply("Verifying...");
      fs.writeFile("money/" + splter[1], splter[2], function(err) {
        if (err == null) {
          msg.reply("success sir!");
        }
      });
    } else if (msg.content === "!dummy") {
      msg.reply(msg.author.id);
      msg.reply(msg.author.tag);
    } else if (
      msg.content.split("|")[0] === "!bal" &&
      msg.author.tag == "Mforoud86#5928"
    ) {
      fs.readFile("money/" + msg.content.split("|")[1], "utf8", function(
        err,
        contents
      ) {
        msg.reply("The balance for this user is:" + contents);
      });
    } else if (msg.content === "!create") {
      msg.reply(
        "**[PREMIUM]**\nThis is not a valid use,you should use it like this:\n!create~TOKEN~NAME~CLIENTID\nOr you can use !truthdare~TOKEN~NAME~CLIENTID to create a truth or date bot."
      );
    } else if (msg.content.split("~")[0] == "!charge") {
      client.users.fetch("497695386513965056").then(user => {
        user.send(
          "[" + msg.author.tag + "] " + "(" + msg.content.split("~")[1] + ")"
        );
        msg.reply("Done.\nPlease wait for your nitro to be verified.");
      });
    } else if (msg.content == "!redeem " + code[0]) {
      fs.readFile("codes/" + msg.author.tag, "utf8", function(err, text) {
        if (text == code[0]) {
          msg.reply("Already redeemed!");
        } else {
          fs.writeFile("codes/" + msg.author.tag, code[0], function(err) {
            if (err == null) {
              var splter = msg.content.split("~");
              fs.writeFile("money/" + splter[1], splter[2], function(err) {
                if (err == null) {
                  msg.reply("You got " + code[1] + " bots!");
                }
              });
            }
          });
        }
      });
    } else {
      credit(msg);
    }
  }
});
