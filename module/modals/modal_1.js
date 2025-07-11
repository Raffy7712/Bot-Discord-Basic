module.exports.modal_1 = async(Interaction) => {
  const name = Interaction.fields.getTextInputValue('inputName');
  const hobies = Interaction.fields.getTextInputValue('inputHobies');
  
  await Interaction.reply({
    content: `Nama: ${name}\nHobi: ${hobies}`
  });
};