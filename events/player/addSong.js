const { EmbedBuilder } = require('discord.js')

module.exports = async (client, queue, song) => {
   const embed = new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setThumbnail(song.thumbnail)
      .setDescription(`Added [${song.name}](${song.url})・Requested by <@${song.user.id}>`)

   queue.textChannel.send({ embeds: [embed] }).catch(() => {})
}