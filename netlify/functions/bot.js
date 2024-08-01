const { Telegraf } = require('telegraf');
const BOT_TOKEN = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M';
const WEB_LINK = 'https://techirrapp.netlify.app/';

const bot = new Telegraf(BOT_TOKEN);

// Basit bir komut
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

// Netlify fonksiyonu
exports.handler = async function(event, context) {
  try {
    console.log('Event:', JSON.stringify(event, null, 2)); // Gelen isteği detaylı olarak loglayın

    if (!event.body) {
      console.error('Boş istek gövdesi');
      return { statusCode: 400, body: 'Bad Request: Empty body' };
    }

    // İstek gövdesinin JSON formatında olduğundan emin olun
    const update = JSON.parse(event.body);
    console.log('Update:', update); // JSON parse edilen veriyi loglayın

    await bot.handleUpdate(update);

    return { statusCode: 200, body: 'Update handled' };
  } catch (err) {
    console.error('Güncelleme işlenirken hata oluştu:', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
