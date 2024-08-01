const { Telegraf } = require('telegraf');
const BOT_TOKEN = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M'; // Bot token
const WEB_LINK = 'https://66ab2fa429d0439148525d4d--techirrapp.netlify.app/'; // Web uygulamanızın URL'si

const bot = new Telegraf(BOT_TOKEN);

// Başlatma komutu
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
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: 'Update handled' };
  } catch (err) {
    console.error('Güncelleme işlenirken hata oluştu', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
