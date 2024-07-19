const { capFirstChar, updateButtons } = require('../Functions')

module.exports = {
   name: 'playerPause',
   run: async (interaction, queue) => {
      if (queue.paused) {
         queue.resume()
         queue.actionRows[1].components[1].setStyle(2)
      } else {
         queue.pause()
         queue.actionRows[1].components[1].setStyle(3)
      }

      updateButtons(queue)
      queue.playerEmbed.setFooter({
         text: `${queue.paused ? '💤 Paused' : '🍕 Resumed'} by ${capFirstChar(interaction.user.globalName)}`,
         iconURL: interaction.user.avatarURL(),
      })
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
