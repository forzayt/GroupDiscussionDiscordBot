const { Client } = require("discord.js-selfbot-v13");
const { joinVoiceChannel } = require("@discordjs/voice");

// Define your list of tokens in an array
const tokens = [
  "", // Replace with your actual tokens

  // Add more tokens as needed
];

const GUILD_ID = "";
const VOICE_CHANNEL_ID = "";

// A function to handle the login and joining of a single client
async function loginAndJoin(token) {
  const client = new Client();
  
  client.on("ready", async () => {
    console.log(`Logged in as ${client.user.username}`);
    
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = guild.channels.cache.get(VOICE_CHANNEL_ID);

    if (channel && channel.isVoice()) {
      try {
        const connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
          selfDeaf: false,
          selfMute: false,
        });
        console.log(`${client.user.username} successfully joined the voice channel.`);
      } catch (e) {
        console.error(`Failed for ${client.user.username} to join VC:`, e);
      }
    } else {
      console.log(`VC not found or not a voice channel for ${client.user.username}.`);
    }
  });

  client.login(token).catch(e => {
    console.error(`Failed to log in with a token. Error: ${e.message}`);
  });
}

// Loop through the tokens array and execute the function for each one
tokens.forEach(token => {
  loginAndJoin(token);
});

console.log(`Attempting to log in with ${tokens.length} accounts...`);