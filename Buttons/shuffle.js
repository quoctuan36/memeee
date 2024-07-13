const { capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerShuf',
   run: async (interaction, queue) => {
      await queue.shuffle()
      queue.playerEmbed.setFooter({
         text: `🌱 Shuffled by ${capFirstChar(interaction.user.globalName)}`,
         iconURL: interaction.user.avatarURL(),
      })
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
