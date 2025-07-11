const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require('discord.js');

module.exports.cmdButton = async(interaction) => {
  const id = interaction.options.getString('id');
  const title = interaction.options.getString('title');
  const style = interaction.options.getInteger('style');

  const validStyles = [1, 2, 3, 4];
  if(!validStyles.includes(style)){
    return interaction.reply({
      content: '❌ Style button tidak valid! Gunakan 1-4',
      flags: MessageFlags.Ephemeral
    });
  }

  let button;
  switch(style){
    case 1:
      button = new ButtonBuilder()
        .setCustomId(id)
        .setLabel(title)
        .setStyle(ButtonStyle.Primary);
      break;
    case 2:
      button = new ButtonBuilder()
        .setCustomId(id)
        .setLabel(title)
        .setStyle(ButtonStyle.Secondary);
      break;
    case 3:
      button = new ButtonBuilder()
        .setCustomId(id)
        .setLabel(title)
        .setStyle(ButtonStyle.Success);
      break;
    case 4:
      button = new ButtonBuilder()
        .setCustomId(id)
        .setLabel(title)
        .setStyle(ButtonStyle.Danger);
      break;
  }
  
  const row = new ActionRowBuilder().addComponents(button);
  
  await interaction.reply({
    content: "",
    components: [row]
  })
};