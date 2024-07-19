const config = require('./config')

if (config.shard) {
   const { ShardingManager } = require('discord.js')
   const manager = new ShardingManager('./Bot/shard.js', { token: config.token, totalShards: 'auto' })
   manager.on('shardCreate', shard => console.log('\x1b[35m%s\x1b[0m', '✔️   ✦ 🌑 Launched shard -- ' + shard.id))
   manager.spawn()
} else {
   const MeowBot = require('./Bot')
   new MeowBot(config)
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
