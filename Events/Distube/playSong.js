const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { capFirstChar, formatTime, getMiliSeconds, updateEmbed, auth, reject, printData } = require('../../Functions')

module.exports = async (client, queue, song) => {
   try {
      const duration = formatTime(song.formattedDuration)

      queue.playerEmbed = new EmbedBuilder()
         .setColor(client.config.player.embedColor)
         .setThumbnail(client.config.player.embedGif)
         .setImage(song.thumbnail)
         .setTimestamp()
         .setAuthor({ name: '─────・ L I V E ❤️‍🔥・─────', iconURL: queue.textChannel.guild.iconURL() })
         .setDescription(`**[${capFirstChar(song.name)}](${song.url})**\n<#${queue.voiceChannel.id}>・${duration}`)
         .setFooter({ text: `🧩 Requested by ${capFirstChar(song.user.globalName)}`, iconURL: song.user.avatarURL() })

      const row1 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: 'playerShuf', label: 'Mix',  style: 2 }),
         new ButtonBuilder({ custom_id: 'playerPrev', label: 'Back', style: 2 }),
         new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop', style: 4 }),
         new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip', style: 2 }),
         new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop', style: 2 }),
      )
      const row2 = new ActionRowBuilder().addComponents(
         new ButtonBuilder({ custom_id: 'playerQueue', label: 'List',  style: 2 }),
         new ButtonBuilder({ custom_id: 'playerSeek',  label: 'Seek',  style: 2 }),
         new ButtonBuilder({ custom_id: 'playerAdd',   label: 'Add',   style: 4 }),
         new ButtonBuilder({ custom_id: 'playerGrab',  label: 'Grab',  style: 2 }),
         new ButtonBuilder({ custom_id: 'playerClear', label: 'Clear', style: 2 }),
      )

      queue.playerMessage = await queue.textChannel.send({ embeds: [queue.playerEmbed], components: [row1, row2] }).catch(() => {})
      const listener = queue.playerMessage.createMessageComponentCollector({ time: getMiliSeconds(duration) })

      listener.on('collect', async (interaction) => {
         if (!auth(client, interaction)) return await reject(interaction)
         await client.buttons.get(interaction.customId)(interaction, queue).catch((e) => console.log(e))
         if (!['playerStop', 'playerAdd'].includes(interaction.customId)) await updateEmbed(interaction, queue)
      })
   } catch {
      console.log('❌   PlaySong Event Error')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
