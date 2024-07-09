const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Functions')

module.exports = {
   name: 'send',
   description: 'Send a message to a channel',

   options: [
      {
         name: 'channel',
         description: 'Specify the channel ID',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
      {
         name: 'message',
         description: 'Message content',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
   ],

   run: async (client, interaction) => {
      try {
         await interaction.deferReply()
         const channelID = interaction.options.getString('channel')
         const messageContent = interaction.options.getString('message')

         const channel = client.channels.cache.get(channelID)

         if (!channel) {
            throw new Error('Invalid text channel ID provided')
         }

         await channel.send(messageContent)

         const embed = new EmbedBuilder()
            .setColor(client.config.player.embedColor)
            .setDescription(`Sent message to <#${channel.id}>: ${messageContent}`)

         deleteMessage(await interaction.editReply({ embeds: [embed] }), 20000)
      } catch (error) {
         console.error('❌   Send Message Error', error)
      }
   }
}