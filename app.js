const config = require("dotenv").config();
const axios = require("axios");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.hears(/video (.+)/, async (ctx) => {
  const messageText = ctx.match[1];
  await axios
    .get(`${process.env.API_URL}?url=${messageText}`)
    .then(function (response) {
      if (response.data.status === "success") {
        ctx.replyWithVideo(
          {
            url: response.data.nwm_video_url,
          },
          {
            caption: `INFORMATION:\n\n- Video title: ${response.data.video_title}\n- Audio: ${response.data.video_music_title}\n- Author Nickname: ${response.data.video_author_nickname}\n\nTotal parsing time: ${response.data.analyze_time} seconds`,
          }
        );
      } else {
        ctx.reply(response.data.reason);
      }
    });
});

bot.hears(/music (.+)/, async (ctx) => {
  const messageText = ctx.match[1];
  await axios
    .get(`${process.env.API_URL}?url=${messageText}`)
    .then(function (response) {
      if (response.data.status === "success") {
        ctx.replyWithAudio(
          {
            url: response.data.video_music_url,
            filename: `${response.data.video_music_title}.mp3`,
          },
          {
            caption: `INFORMATION:\n\n- Music title: ${response.data.video_music_title}\n- Music Author: ${response.data.video_music_author}\n\nTotal parsing time: ${response.data.analyze_time} seconds`,
          }
        );
      } else {
        ctx.reply(response.data.reason);
      }
    });
});

bot.help(async (ctx) => {
  await ctx.reply(
    `HOW TO USE:\n\n- Videos\nTo download video send message in "/video tiktokURL" format\n\n-Music\nTo download music send a message in the format "/music tiktokURL"`
  );
});

bot.start(async (ctx) => {
  await ctx.reply(
    `Welcome ${ctx.message.from.first_name} to TikTok/Douyin Downloader.\n\nUsing this bot, you can download TikTok videos without watermark.\n\nFor beginners how to use this bot just send a message "/help" to get information about using this bot`
  );
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
