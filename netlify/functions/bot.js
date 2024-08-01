const { Telegraf } = require('telegraf');

const BOT_TOKEN = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M';
const WEB_LINK = 'https://techirrapp.netlify.app/';

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

exports.handler = async function(event, context) {
  try {
    console.log('Gelen istek:', event.body);

    if (!event.body) {
      console.error('Boş istek gövdesi');
      return { statusCode: 400, body: 'Bad Request: Empty body' };
    }

    let update;
    try {
      update = JSON.parse(event.body);
    } catch (jsonError) {
      console.error('JSON parse hatası:', jsonError);
      return { statusCode: 400, body: 'Bad Request: Invalid JSON' };
    }

    console.log('Update:', update);
    await bot.handleUpdate(update);

    return { statusCode: 200, body: 'Update handled' };
  } catch (err) {
    console.error('Güncelleme işlenirken hata oluştu:', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
