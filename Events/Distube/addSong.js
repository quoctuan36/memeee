const { getAddEmbed } = require('../../Functions')

module.exports = async (client, queue, song) => {
   try {
      queue.textChannel.send({ embeds: [getAddEmbed(client, song)] }).catch(() => {})
   } catch {
      console.log('❌  ✦ 🥝 AddSong Error')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
