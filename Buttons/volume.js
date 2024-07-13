const { showModal } = require('../Functions')

module.exports = {
   name: 'playerVol',
   run: async (interaction) => {
      await showModal(interaction, 'playerVolumeModal', 'Volume', 'playerVolumeInput', 'Volume', 'Enter volume between 0 and 100')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
