const { capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerLoop',
   run: async (interaction, queue) => {
      await queue.setRepeatMode(queue.repeatMode === 2 ? 0 : queue.repeatMode + 1)
      const loopMode = ['Loop off', 'Loop song', 'Loop queue']
      queue.playerEmbed.setFooter({
         text: `🏵️ ${loopMode[queue.repeatMode]} by ${capFirstChar(interaction.user.globalName)}`,
         iconURL: interaction.user.avatarURL(),
      })
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
