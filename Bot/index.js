const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')
const { YouTubePlugin } = require('@distube/youtube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { DisTube } = require('distube')

module.exports = class MeowBot {
   constructor(config) {
      this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })

      this.client.config = config
      this.client.player = new DisTube(this.client, { plugins: [new YouTubePlugin(), new SpotifyPlugin(), new SoundCloudPlugin()] })
      this.client.buttons = new Collection()
      this.client.commands = new Collection()
      this.client.interface = []

      require('./init')(this.client)
      require('./login')(this.client)
   }
}










// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
