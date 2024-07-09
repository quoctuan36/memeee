const { showModal } = require('../Functions')

module.exports = {
   name: 'playerVol',
   run: async (client, interaction) => {
      await showModal(interaction, 'playerVolumeModal', 'Volume', 'playerVolumeInput', 'Volume', 'Enter volume between 0 and 100')
   }
}