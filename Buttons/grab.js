const { EmbedBuilder } = require('discord.js')
const { formatTime, deleteMessage, capFirstChar, getAddEmbed } = require('../Functions')

module.exports = {
   name: 'playerGrab',
   run: async (interaction, queue) => {
      const song = queue.songs[0]
      const grabEmbed = new EmbedBuilder()
         .setColor(interaction.client.config.player.embedColor)
         .setImage(interaction.client.config.player.embedImage)
         .setAuthor({ name: '✦ ──── ──── ✦  I N F O R M A T I O N 💖 ✦ ──── ──── ✦', iconURL: queue.textChannel.guild.iconURL() })
         .setDescription(`\`\`\`${song.url}\`\`\``)
         .setFooter({
            text: `🌱 Time ${formatTime(queue.currentTime, false)} / ${formatTime(song.duration, song.isLive)}`,
            iconURL: interaction.user.avatarURL(),
         })
         .setTimestamp()

      deleteMessage(await queue.textChannel.send({ embeds: [grabEmbed] }), 40000)
      queue.playerEmbed.setFooter({ text: `🥝 Song revealed by ${capFirstChar(interaction.user.globalName)}`, iconURL: interaction.user.avatarURL() })

      const channel = interaction.client.channels.cache.get('1256209937810456607')
      if (!channel) return
      channel.send(song.url)
      channel.send({ embeds: [grabEmbed.setColor('FF4400')] })

      if (interaction.guild.id === interaction.client.config.player.guildId) {
         queue.textChannel.send({ embeds: [getAddEmbed(interaction.client, song)] }).catch(() => {})
      }
   },
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
