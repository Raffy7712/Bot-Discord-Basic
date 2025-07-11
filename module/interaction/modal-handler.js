const { MessageFlags } = require('discord.js');
const { modal_1 } = require('../modals/modal_1');

const modalHandlers = {
  testModal: modal_1
};

module.exports.modalHandler = async(interaction) => {
  const { customId } = interaction;
  const handler = modalHandlers[customId];
  
  if(!handler) {
    console.warn(`⚠️ Tidak ada handler untuk modal: ${customId}`);
    return interaction.reply({
      content: 'Modal belum diimplementasikan!',
      flags: MessageFlags.Ephemeral
    });
  }

  try{
    await handler(interaction);
    console.log(`✅ Modal ${customId} berhasil dijalankan`);
  }catch(error){
    console.error(`❌ Error menjalankan modal ${customId}:`, error);
    await interaction.reply({
      content: 'Terjadi kesalahan saat menjalankan modal!',
      flags: MessageFlags.Ephemeral
    });
  }
};