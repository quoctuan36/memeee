const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { playMusic, deleteMessage } = require('../Functions')

module.exports = {
   name: 'play',
   description: 'Play music',
   voiceChannel: true,
   options: [
      {
         name: 'name',
         description: 'Type music name or any youtube, spotify link :3',
         type: ApplicationCommandOptionType.String,
         required: true,
      },
      {
         name: 'position',
         description: 'Position of the song to be added. Default is after current song',
         type: ApplicationCommandOptionType.Integer,
         required: false,
         autocomplete: true,
      },
   ],

   suggest: async (interaction) => {
      const query = interaction.options.getFocused()
      const choices = [1, 50, 100]

      const filtered = choices.filter((choice) => choice >= query)
      const response = filtered.map((choice) => ({ name: choice, value: choice }))

      await interaction.respond(response)
   },

   run: async (client, interaction) => {
      try {
         await interaction.deferReply()
         const name = interaction.options.getString('name')
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor).setDescription('Meowing')
         const msg = await interaction.editReply({ embeds: [embed] })
         let position = interaction.options.getInteger('position', false) ?? undefined

         if (queue && queue.songs.length >= 2) position = 1

         try {
            await playMusic(client, interaction, name, position)
            deleteMessage(msg, 3000)
         } catch {
            embed.setDescription('Not found')
            await interaction.editReply({ embeds: [embed] })
            deleteMessage(msg, 5000)
         }
      } catch (e) {
         console.log('❌  ✦ Play Error',e)
      }
   }
}
