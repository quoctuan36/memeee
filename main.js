const config = require('./config')
const MeowBot = require('./Bot')

if (config.shard) {
   const { ShardingManager } = require('discord.js')
   const manager = new ShardingManager(new MeowBot(config), { token: config.TOKEN, totalShards: 'auto' })
   manager.on('shardCreate', shard => console.log('\x1b[34m%s\x1b[0m', `✔️    🧊 ⬪ Launched shard ${shard.id}`))
   manager.spawn()
} else {
   new MeowBot(config)
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
