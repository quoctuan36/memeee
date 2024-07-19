const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { YouTubePlugin } = require('@distube/youtube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { DisTube } = require('distube')

client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] })

client.config = require('../config')
client.player = new DisTube(this.client, { plugins: [new YouTubePlugin(), new SpotifyPlugin(), new SoundCloudPlugin()] })
client.buttons = new Collection()
client.commands = new Collection()
client.interface = []

require('./init')(client)
require('./login')(client)









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
