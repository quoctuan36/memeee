module.exports = {
   name: 'playerPrev',
   run: async (client, interaction, queue, embed) => {
      await queue.previous().catch(() => {
         embed.setFooter({ text: `🌵 No song`, iconURL: interaction.user.avatarURL() })
      })
   }
}