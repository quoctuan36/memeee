const { showModal } = require('../Functions')

module.exports = {
   name: 'playerSeek',
   run: async (client, interaction) => {
      await showModal(interaction, 'playerSeekModal', 'Seek', 'playerSeekInput', 'Time', 'Enter time e.g., 2h 3m 4s')
   }
}