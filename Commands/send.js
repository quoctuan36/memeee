const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage, strict, isStrict } = require('../Functions')

module.exports = {
   name: 'send',
   description: 'Send a message to a channel',

   options: [
      {
         name: 'channel',
         description: 'Specify the channel ID',
         type: ApplicationCommandOptionType.String,
         required: true,
         autocomplete: true,
      },
      {
         name: 'message',
         description: 'Message content',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   suggest: async (interaction) => {
      if (isStrict(interaction)) return await interaction.respond({ name: `I'm sleeping`, value: ' ' })

      const query = interaction.options.getFocused()
      const choices = [
         { name: '🌱・chat', value: '684975114923933781' },
         { name: '🧩・commands', value: '753275189084553276' },
         { name: '🥪・liltuan', value: '1259547237218779207' },
      ]

      const filtered = choices.filter((choice) => choice.name.includes(query))
      const response = filtered.map((choice) => ({ name: choice.name, value: choice.value }))

      await interaction.respond(response)
   },

   run: async (client, interaction) => {
      if (isStrict(interaction)) return strict(interaction)

      try {
         await interaction.deferReply()
         const channelID = interaction.options.getString('channel')
         const messageContent = interaction.options.getString('message')
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         const channel = client.channels.cache.get(channelID)
         if (!channel) {
            embed.setDescription(`There is no channel with the provided ID`)
            return deleteMessage(await interaction.editReply({ embeds: [embed] }), 5000)
         }

         await channel.send(messageContent)

         embed.setDescription(`Sent message to <#${channel.id}>: ${messageContent}`)
         deleteMessage(await interaction.editReply({ embeds: [embed] }), 20000)
      } catch (error) {
         console.error('❌   Send Message Error', error)
      }
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
