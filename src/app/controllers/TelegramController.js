import 'dotenv/config';
import Telegraf from 'telegraf';
import Markup from 'telegraf/markup';

import mapsApi from '../services/maps';

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

console.log('TELEGRAM BOT STARTED');

// ACTIONS

bot.start(ctx =>
  ctx.reply('Olá, bem vindo ao GeoCoder BOT desenvolvido por ffcro3!')
);

bot.command('actions', ({ reply }) => {
  return reply(
    'Eu posso',
    Markup.keyboard([['Buscar GeoCode por endereço']])
      .oneTime()
      .resize()
      .extra()
  );
});

bot.hears('Buscar GeoCode por endereço', ctx => {
  ctx.reply('Digite o endereço desta forma: ');
  bot.telegram.sendMessage(
    process.env.TELEGRAM_CHAT,
    'Endereço: Exemplo, 109 Sao Paulo'
  );
});

bot.on('text', async ctx => {
  if (ctx.message.text.includes('Endereço:')) {
    const address = ctx.message.text.replace('endereço:', '');
    mapsApi.geocode(
      {
        address,
      },
      function(err, response) {
        if (!err) {
          ctx.reply(
            `Número: ${response.json.results[0].address_components[0].long_name},
Rua: ${response.json.results[0].address_components[1].long_name},
Bairro: ${response.json.results[0].address_components[2].long_name},
Cidade: ${response.json.results[0].address_components[3].long_name},
Estado: ${response.json.results[0].address_components[4].long_name},
País: ${response.json.results[0].address_components[5].long_name},
Endereço Completo: ${response.json.results[0].formatted_address},
Latitude: ${response.json.results[0].geometry.location.lat},
Longitude: ${response.json.results[0].geometry.location.lng},`
          );
        }
      }
    );
  }
});

bot.launch();
