const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// Add all your bot tokens here
const BOT_CONFIGS = [
  {
    token: 'BOT_TOKEN_1',
    guildId: 'GUILD_ID',
    channelId: 'CHANNEL_ID'
  },
  {
    token: 'BOT_TOKEN_2',
    guildId: 'GUILD_ID',
    channelId: 'CHANNEL_ID'
  },
  // Add more bots here...
];

BOT_CONFIGS.forEach(({ token, guildId, channelId }) => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
    ]
  });

  client.once('ready', async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const guild = await client.guilds.fetch(guildId);
    const channel = await guild.channels.fetch(channelId);

    if (!channel || channel.type !== 2) {
      console.error('❌ Invalid voice channel ID');
      return;
    }

    const connection = joinVoiceChannel({
      channelId: channelId,
      guildId: guildId,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });

    try {
      const me = await guild.members.fetch(client.user.id);
      if (me.voice.serverDeaf) {
        await me.voice.setDeaf(false);
        console.log(`🔊 ${client.user.tag} undeafened`);
      }
    } catch (err) {
      console.error(`❌ ${client.user.tag} failed to undeafen:`, err);
    }

    console.log(`🎤 ${client.user.tag} has joined the voice channel!`);
  });

  client.login(token);
});
