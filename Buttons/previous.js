module.exports = {
   name: 'playerPrev',
   run: async (interaction, queue) => {
      await queue.previous().catch(() => {
         queue.playerEmbed.setFooter({ text: `🌵 No song`, iconURL: interaction.user.avatarURL() })
      })
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
