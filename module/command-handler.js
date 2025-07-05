const { cmdPing } = require('./commands/ping');
const { cmdHello } = require('./commands/hello');

const commandHandlers = {
  ping: cmdPing,
  hello: cmdHello
};

module.exports = {
  commandHandler: async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const { commandName } = interaction;
    const handler = commandHandlers[commandName];
    
    if (!handler) {
      console.warn(`⚠️ Tidak ada handler untuk command: ${commandName}`);
      return interaction.reply({
        content: 'Command belum diimplementasikan!',
        ephemeral: true
      });
    }

    try {
      await handler(interaction);
      console.log(`✅ Command ${commandName} berhasil dijalankan`);
    } catch (error) {
      console.error(`❌ Error menjalankan command ${commandName}:`, error);
      await interaction.reply({
        content: 'Terjadi kesalahan saat menjalankan command!',
        ephemeral: true
      });
    }
  }
};