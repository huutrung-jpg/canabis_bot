const { Telegraf } = require("telegraf");
const TOKEN = "7411630164:AAH5OEdgqTlpBNkN5vE_0jmK8Zl1mWLCeWg";
const bot = new Telegraf(TOKEN);

const web_link = "https://celadon-ganache-70901f.netlify.app/";

bot.start((ctx) =>
  ctx.reply("Welcome :)))))", {
    reply_markup: {
      keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
    },
  })
);

bot.launch();