const { EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Functions')

module.exports = {
   name: 'stop',
   description: 'Stop the music and clear the queue',
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         await interaction.deferReply()
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music is currently playing')
         } else {
            if (queue.playerMessage) await queue.playerMessage.delete().catch(() => {})
            await queue.stop()
            embed.setDescription('Stopped the music and cleared the queue')
         }

         deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
      } catch {
         console.log('❌  ✦ Stop Error')
      }
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
