const { Telegraf } = require('telegraf');
const BOT_TOKEN = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M';
const WEB_LINK = 'https://66a88ad70e4c3a0008a20e40--techirrapp.netlify.app/';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome', {
    reply_markup: {
      keyboard: [
        [
          { text: "web app", web_app: { url: WEB_LINK } }
        ]
      ],
      resize_keyboard: true,  // To ensure the keyboard fits the screen size
      one_time_keyboard: true // To hide the keyboard after use
    }
  });
});

bot.launch();
