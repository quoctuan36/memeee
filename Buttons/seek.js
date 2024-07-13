const { showModal } = require('../Functions')

module.exports = {
   name: 'playerSeek',
   run: async (interaction) => {
      await showModal(interaction, 'playerSeekModal', 'Seek', 'playerSeekInput', 'Time', 'Enter time e.g., 2h 3m 4s')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
