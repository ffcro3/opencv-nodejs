import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config'

class TelegramMessage {
  get key() {
    return 'TelegramMessage';
  }

  async handle({ data }) {
    
    const token = process.env.TELEGRAM_TOKEN

    const bot = new TelegramBot( token, { polling: true } )

    await bot.on('/\/start/', (msg) => {
        bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo!!`)
     })
  }
}

export default new TelegramMessage();
