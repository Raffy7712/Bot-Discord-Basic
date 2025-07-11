module.exports.cmdHello = async(interaction) => {
  const user = interaction.user
  await interaction.reply(`Halo, ${user}! 👋`);
};