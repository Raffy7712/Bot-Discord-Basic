const { Client, Events, GatewayIntentBits } = require('discord.js');
const { commandManager } = require('./module/command-manager');
const { commandHandler } = require('./module/command-handler');
require('dotenv').config();

const ping = require('./module/commands/ping')

const { BotToken } = process.env;

// Fungsi utama aplikasi
const main = async (token) => {
  // 1. Sinkronisasi command terlebih dahulu
  const syncResult = await commandManager();
  
  if (!syncResult.success) {
    console.log('\n🚫 Gagal sinkronisasi command, bot tidak dilanjutkan');
    process.exit(1);
  }
  
  console.log('\n🚀 Melanjutkan inisialisasi bot...');
  
  // 2. Inisialisasi bot Discord
  const client = new Client({ 
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ] 
  });

  // Event handler untuk bot ready
  client.once(Events.ClientReady, readyClient => {
    console.log(`\n🤖 Bot siap! Login sebagai ${readyClient.user.tag}`);
    console.log(`💻 Server: ${client.guilds.cache.size} server`);
  });

  // Event handler untuk interaksi command
  client.on(Events.InteractionCreate, commandHandler);

  // Jalankan bot
  try {
    await client.login(token);
    console.log('\n🔑 Berhasil login ke Discord');
  } catch (loginError) {
    console.error('\n🔒 Gagal login:', loginError);
    process.exit(1);
  }
};

// Jalankan aplikasi
main(BotToken).catch(error => {
  console.error('\n🔥 Error utama:', error);
  process.exit(1);
});