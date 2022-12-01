const config = require("dotenv").config();
const axios = require("axios");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const prefix_video = `/${process.env.PREFIX_VIDEO} (.+)`;
const prefix_music = `/${process.env.PREFIX_MUSIC} (.+)`;

const prefix_copy = `/.+复制打开抖音.+`;

bot.hears(new RegExp(prefix_copy), async (ctx) => {
  console.log("111",ctx.input)
  console.log("222",ctx.input[0])

  // const res = await axios.get(`${process.env.API_URL}?url=${messageText}`);
  // const { data } = res;
  // if (data.status === "success") {
  //   await ctx.replyWithVideo(
  //       {
  //         url: data.video_data.nwm_video_url,
  //       },
  //       {
  //         caption: `INFORMATION:\n\n- Video title: ${data.desc}\n- Audio: ${data.music.title}\n- Author Nickname: ${data.author.nickname}\n\nTotal parsing time: ${data.total_time} seconds`,
  //       }
  //   );
  // } else {
  //   await ctx.reply(data.reason);
  // }
});




bot.hears(new RegExp(prefix_video), async (ctx) => {
  const messageText = ctx.match[1];
  const res = await axios.get(`${process.env.API_URL}?url=${messageText}`);
  const { data } = res;
  if (data.status === "success") {
    await ctx.replyWithVideo(
      {
        url: data.video_data.nwm_video_url,
      },
      {
        caption: `INFORMATION:\n\n- Video title: ${data.desc}\n- Audio: ${data.music.title}\n- Author Nickname: ${data.author.nickname}\n\nTotal parsing time: ${data.total_time} seconds`,
      }
    );
  } else {
    await ctx.reply(data.reason);
  }
});

bot.hears(new RegExp(prefix_music), async (ctx) => {
  const messageText = ctx.match[1];
  const res = await axios.get(`${process.env.API_URL}?url=${messageText}`);
  const { data } = res;
  if (data.status === "success") {
    ctx.replyWithAudio(
      {
        url: data.video_music_url,
        filename: `${data.video_music_title}.mp3`,
      },
      {
        caption: `INFORMATION:\n\n- Music title: ${data.video_music_title}\n- Music Author: ${data.video_music_author}\n\nTotal parsing time: ${data.analyze_time} seconds`,
      }
    );
  } else {
    await ctx.reply(data.reason);
  }
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

bot.launch().then((_) => console.log("Bot is running..."));

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
