const TelegramBot = require('node-telegram-bot-api');
const token = '7400783507:AAGC4XhT0uWy3qniGfO-TmoFkkQ1-dSDeO8'; // BotFather'dan aldığınız token
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome! Use /showapp to view the React app.');
});

bot.onText(/\/showapp/, (msg) => {
  const chatId = msg.chat.id;
  const url = 'https://66a88ad70e4c3a0008a20e40--techirrapp.netlify.app/'; // Netlify üzerinde dağıttığınız React uygulamanızın URL'si
  bot.sendMessage(chatId, `Here is the React app: ${url}`);
});
