const { showModal } = require('../Functions')

module.exports = {
   name: 'playerAdd',
   run: async (client, interaction) => {
      await showModal(interaction, 'playerAddModal', 'Add Music', 'playerAddInput', 'Name', 'Enter music name')
   }
}