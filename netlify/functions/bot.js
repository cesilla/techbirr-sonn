const { Telegraf } = require('telegraf');
const BOT_TOKEN = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M'; // Doğrudan kodda token tanımlayın
const WEB_LINK = 'https://techirrapp.netlify.app/'; // Web uygulamanızın URL'si

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Welcome! Use the button below to open the web app.', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Connect Wallet", web_app: { url: WEB_LINK } }
        ]
      ]
    }
  });
});

bot.launch();

exports.handler = async function(event, context) {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: 'Update handled' };
  } catch (err) {
    console.error('Error handling update', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
