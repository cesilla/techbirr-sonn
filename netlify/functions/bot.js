const { Telegraf } = require('telegraf');
const token = '7400783507:AAGC4XhT0uWy3qniGfO-TmoFkkQ1-dSDeO8'; // Doğrudan token'ı burada tanımlayın
const bot = new Telegraf(token);

bot.start((ctx) => {
  ctx.reply('Welcome! Use /showapp to view the React app.');
});

bot.command('showapp', (ctx) => {
  const url = 'https://66a88ad70e4c3a0008a20e40--techirrapp.netlify.app/'; // Netlify üzerinde dağıttığınız React uygulamanızın URL'si
  ctx.reply(`Here is the React app: ${url}`);
});

exports.handler = async function(event, context) {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: 'Update handled' };
  } catch (err) {
    console.error('Error handling update', err);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
