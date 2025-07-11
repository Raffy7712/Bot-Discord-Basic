const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
module.exports.button_1 = async(interaction) => {
  // interaction.reply({
  //   content: "Tombol di klik!"
  // });
  const testModal = new ModalBuilder()
    .setCustomId('testModal')
    .setTitle('Test Modal');

  const name = new TextInputBuilder()
    .setCustomId('inputName')
    .setLabel('What is your name?')
    .setStyle(TextInputStyle.Short);
  const hobies = new TextInputBuilder()
    .setCustomId('inputHobies')
    .setLabel("What's some of your favorite hobbies?")
    .setStyle(TextInputStyle.Paragraph);

  const input1 = new ActionRowBuilder().addComponents(name);
  const input2 = new ActionRowBuilder().addComponents(hobies);

  testModal.addComponents(input1, input2);

  await interaction.showModal(testModal);
};