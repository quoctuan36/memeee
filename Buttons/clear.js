const { capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerClear',
   run: async (interaction, queue) => {
      if (queue.songs.length > 1) queue.songs = []

      queue.playerEmbed.setFooter({
         text: `🫓 Queue cleared by ${capFirstChar(interaction.user.globalName)}`,
         iconURL: interaction.user.avatarURL(),
      })
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
