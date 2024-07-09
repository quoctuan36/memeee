const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')
const { description, capFirstChar, deleteMessage } = require('../Functions')

module.exports = {
   name: 'filter',
   description: 'Modify filters',
   voiceChannel: true,

   run: async (client, interaction) => {
      try {
         await interaction.deferReply()
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)


         if (!queue || !queue.playing) {
            embed.setDescription('No music is currently playing')
            deleteMessage(await interaction.editReply({ embeds: [embed] }), 10000)
            return
         } 

         embed
            .setImage(client.config.player.embedImage)
            .setDescription(description(queue))
            .setAuthor({ name: '─────・ F I L T E R S 🌱・─────', iconURL: interaction.guild.iconURL() })
            .setFooter({ text: `🧩 • Requested by ${capFirstChar(interaction.user.globalName)}`, iconURL: interaction.user.avatarURL() })
            .setTimestamp()

         const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('3d').setLabel('3D').setStyle('Secondary'),
            new ButtonBuilder().setCustomId('haas').setLabel('Stereo').setStyle('Secondary'),
            new ButtonBuilder().setCustomId('vaporwave').setLabel('Slowed').setStyle('Secondary'),
            new ButtonBuilder().setCustomId('nightcore').setLabel('Nightcore').setStyle('Secondary'),
            new ButtonBuilder().setCustomId('filterClose').setLabel('Close').setStyle('Danger')
         )

         const message = await interaction.editReply({ embeds: [embed], components: [row]})
         const filter = (i) => i.user.id === interaction.user.id
         const collector = message.createMessageComponentCollector({ filter, time: 120000 })

         collector.on('collect', async (button) => {
            if (button.customId === 'filterClose' || !['3d', 'haas', 'vaporwave', 'nightcore'].includes(button.customId)) {
               collector.stop()
               return
            }

            const filter = button.customId
            queue.filters.has(filter) ? queue.filters.remove(filter) : queue.filters.add(filter)

            embed.setDescription(description(queue))

            await button.deferUpdate()
            await interaction.editReply({ embeds: [embed], components: [row]})
         })

         collector.on('end', async () => {
            deleteMessage(message, 100)
         })
      } catch {
         console.error('❌   Filter Error')
      }
   }
}