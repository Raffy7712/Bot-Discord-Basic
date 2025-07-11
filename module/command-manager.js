const { REST, Routes } = require('discord.js');
const { Commands } = require('./data/command.json');

const cleanCommand = ({ Id, type, ...cmd }) => cmd;

const compareCommands = (registered, desired) => ({
  registered: desired.filter(d => registered.some(r => r.name === d.name)),
  toAdd: desired.filter(d => !registered.some(r => r.name === d.name)),
  toRemove: registered.filter(r => !desired.some(d => d.name === r.name))
});

module.exports.commandManager = async(BotToken, BotClientId, GuildId) => {
  const rest = new REST({ version: '10' }).setToken(BotToken);
  try{
    console.log('⏳ Memulai sinkronisasi command Discord...');
    
    if(!BotToken || !BotClientId || !GuildId){
      throw new Error('Variabel lingkungan tidak lengkap!');
    }

    const globalCmds = Commands.filter(c => c.type === 'global');
    const guildCmds = Commands.filter(c => c.type === 'guild');

    const [regGlobal, regGuild] = await Promise.all([
      rest.get(Routes.applicationCommands(BotClientId)),
      rest.get(Routes.applicationGuildCommands(BotClientId, GuildId))
    ]);

    const global = compareCommands(regGlobal, globalCmds);
    const guild = compareCommands(regGuild, guildCmds);

    console.log('\n📊 Status Command:');
    console.log(`Global: ${global.registered.length} terdaftar | ${global.toAdd.length} tambah | ${global.toRemove.length} hapus`);
    console.log(`Guild: ${guild.registered.length} terdaftar | ${guild.toAdd.length} tambah | ${guild.toRemove.length} hapus`);

    let changes = false;
    
    if(global.toAdd.length > 0 || global.toRemove.length > 0){
      console.log('\n🔄 Menyinkronisasi global commands...');
      await rest.put(
        Routes.applicationCommands(BotClientId),
        { body: globalCmds.map(cleanCommand) }
      );
      console.log(`✅ ${globalCmds.length} global command tersinkronisasi`);
      changes = true;
    }
    
    if(guild.toAdd.length > 0 || guild.toRemove.length > 0){
      console.log('\n🔄 Menyinkronisasi guild commands...');
      await rest.put(
        Routes.applicationGuildCommands(BotClientId, GuildId),
        { body: guildCmds.map(cleanCommand) }
      );
      console.log(`✅ ${guildCmds.length} guild command tersinkronisasi`);
      changes = true;
    }

    if(!changes){
      console.log('\nℹ️ Tidak ada perubahan command');
    }

    console.log('\n✅ Sinkronisasi command selesai');
    return{ success: true };

  }catch(error){
    console.error('\n❌ Error selama sinkronisasi:');
    console.error(error);
    return{ success: false, error: error.message };
  }
};