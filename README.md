# TikDo Telegram BOT

This is BOT Telegram downloader TikTok/Douyin. Download videos without watermark by pasting share link in send message.

# How to deploy?

## Installing requirements

- Clone this repo :

```git
git clone https://github.com/fikiismyname/tikdo.git
cd tikdo
```

> Make sure NodeJS and npm is installed

- Install required npm packages :

```node
npm install
```

## Setting up config file

- Rename .env.example to .env :
  `cp .env.example .env`

Fill up all the fields. Meaning of each fields are discussed below:

- **BOT_TOKEN** : The telegram bot token that you get from [@BotFather](https://t.me/botfather)
- **API_URL** : API URL you get from [Douyin_TikTok_Download_API(抖音/TikTok 无水印解析 API)](https://github.com/Evil0ctal/Douyin_TikTok_Download_API)
- **PREFIX_VIDEO** : Change this if you want a custom command bot prefix to download video
- **PREFIX_MUSIC** : Change this if you want a custom command bot prefix to download music

# Deploying

- Start the bot by using this command :
  `npm start`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

<details><summary>Reference & Thanks</summary>

- API Information / API: [Github Repo](https://github.com/Evil0ctal/Douyin_TikTok_Download_API)
- telegraf.js - Modern Telegram Bot Framework for Node.js: [Github Repo](https://www.freepik.com/vectors/tiktok-background)
- axios - Promise based HTTP client for the browser and node.js: [Github Repo](https://www.freepik.com/vectors/tiktok-background)
</details>
