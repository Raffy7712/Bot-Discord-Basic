const { MessageFlags } = require('discord.js');
const { button_1 } = require('../buttons/button_1');

const buttonHandlers = {
  testButton: button_1
};

module.exports.buttonHandler = async(interaction) => {
  const { customId } = interaction;
  const handler = buttonHandlers[customId];

  if(!handler) {
    console.warn(`⚠️ Tidak ada handler untuk tombol: ${customId}`);
    return interaction.reply({
      content: 'Button belum diimplementasikan!',
      flags: MessageFlags.Ephemeral
    });
  }
  try{
    await handler(interaction);
    console.log(`✅ Handler untuk tombol ${customId} berhasil dijalankan`);
  }catch(error){
    console.error(`❌ Error menjalankan handler tombol ${customId}:`, error);
    await interaction.reply({
      content: 'Terjadi kesalahan saat menjalankan handler tombol!',
      flags: MessageFlags.Ephemeral
    });
  }
};