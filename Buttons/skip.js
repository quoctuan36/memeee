module.exports = {
   name: 'playerSkip',
   run: async (client, interaction, queue, embed) => {
      await queue.skip().catch(() => {
         embed.setFooter({ text: `🥙 No song`, iconURL: interaction.user.avatarURL() })
      })
   }
}