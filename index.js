const { Client, Events, GatewayIntentBits } = require('discord.js');
const { commandManager } = require('./module/command-manager');
const { commandHandler } = require('./module/interaction/command-handler');
const { buttonHandler } = require('./module/interaction/button-handler');
const { modalHandler } = require('./module/interaction/modal-handler');
require('dotenv').config();

const { BotToken, BotClientId, GuildId } = process.env;

const main = async (token) => {
  const syncResult = await commandManager(BotToken, BotClientId, GuildId);
  
  if (!syncResult.success) {
    console.log('\n🚫 Gagal sinkronisasi command, bot tidak dilanjutkan');
    process.exit(1);
  }
  
  console.log('\n🚀 Melanjutkan inisialisasi bot...');
  
  const client = new Client({ 
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ] 
  });

  client.once(Events.ClientReady, readyClient => {
    console.log(`\n🤖 Bot siap! Login sebagai ${readyClient.user.tag}`);
    console.log(`💻 Server: ${client.guilds.cache.size} server`);
  });

  client.on(Events.InteractionCreate, async(interaction) => {
    if(interaction.isCommand()){
      commandHandler(interaction);
    }else if(interaction.isButton()){
      buttonHandler(interaction);
    }else if(interaction.isModalSubmit()){
      modalHandler(interaction);
    }
    return;
  });

  try {
    await client.login(token);
    console.log('\n🔑 Berhasil login ke Discord');
  } catch (loginError) {
    console.error('\n🔒 Gagal login:', loginError);
    process.exit(1);
  }
};

main(BotToken).catch(error => {
  console.error('\n🔥 Error utama:', error);
  process.exit(1);
});