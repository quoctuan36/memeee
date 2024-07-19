const { handleCommand, handleModalSubmit } = require('../../Functions')
const { InteractionType } = require('discord.js')

module.exports = async (client, interaction) => {
   try {
      if (!interaction.guild) return interaction.reply({ content: 'Use command in a server :3' })

      switch (interaction.type) {
         case InteractionType.ApplicationCommand:
            await handleCommand(client, interaction)
            break

         case InteractionType.ApplicationCommandAutocomplete:
            await client.commands.get(interaction.commandName).suggest(interaction)
            break

         case InteractionType.ModalSubmit:
            await handleModalSubmit(client, interaction)
            break
      }
   } catch (e) {
      console.log('❌  ✦ 🍉 Interaction Error\n', e)
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
