const { showModal } = require('../Functions')

module.exports = {
   name: 'playerAdd',
   run: async (interaction) => {
      await showModal(interaction, 'playerAddModal', 'Add Music', 'playerAddInput', 'Name', 'Enter music name or link')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
