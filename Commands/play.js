const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { playMusic, deleteMessage, songSuggestion } = require('../Functions')

module.exports = {
   name: 'play',
   description: 'Play music',
   voiceChannel: true,
   options: [
      {
         name: 'name',
         description: 'Type music name or link',
         type: ApplicationCommandOptionType.String,
         required: true,
         //autocomplete: true,
      },
   ],

   // suggest: async (interaction) => {
   //    const query = interaction.options.getFocused().toLowerCase()
   //    const song = await songSuggestion(interaction.client, query)
   //    const data = song.map((song) => ({ name: song, value: song }))
   //    await interaction.respond(data)
   // },

   run: async (client, interaction) => {
      try {
         await interaction.deferReply()
         const name = interaction.options.getString('name')
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor).setDescription('Meowing')
         const msg = await interaction.editReply({ embeds: [embed] })

         try {
            await playMusic(client, interaction, name)
            deleteMessage(msg, 1000)
         } catch {
            embed.setDescription('Not found')
            await interaction.editReply({ embeds: [embed] })
            deleteMessage(msg, 5000)
         }
      } catch {
         console.log('❌    Play Error')
      }
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
