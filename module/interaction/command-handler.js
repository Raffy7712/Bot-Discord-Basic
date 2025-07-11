const { MessageFlags } = require('discord.js');
const { cmdPing } = require('../commands/ping');
const { cmdHello } = require('../commands/hello');
const { cmdButton } = require('../commands/button');

const commandHandlers = {
  ping: cmdPing,
  hello: cmdHello,
  button: cmdButton
};

module.exports.commandHandler = async(interaction) => {
  const { commandName } = interaction;
  const handler = commandHandlers[commandName];
  
  if(!handler) {
    console.warn(`⚠️ Tidak ada handler untuk command: ${commandName}`);
    return interaction.reply({
      content: 'Command belum diimplementasikan!',
      flags: MessageFlags.Ephemeral
    });
  }

  try{
    await handler(interaction);
    console.log(`✅ Command ${commandName} berhasil dijalankan`);
  }catch(error){
    console.error(`❌ Error menjalankan command ${commandName}:`, error);
    await interaction.reply({
      content: 'Terjadi kesalahan saat menjalankan command!',
      flags: MessageFlags.Ephemeral
    });
  }
};