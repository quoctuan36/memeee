const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { deleteMessage } = require('../Functions')

module.exports = {
   name: 'volume',
   description: 'Adjust the volume of the music',
   voiceChannel: true,
   options: [
      {
         name: 'volume',
         description: 'Type a number',
         type: ApplicationCommandOptionType.Integer,
         required: true,
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
         const maxVol = client.config.player.maxVol
         const vol = interaction.options.getInteger('volume')
         const queue = client.player.getQueue(interaction.guild.id)
         const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

         if (!queue || !queue.playing) {
            embed.setDescription('No music is currently playing')
         } else if (queue.volume === vol) {
            embed.setDescription(`Volume is already set to ${vol}`)
         } else if (!vol || vol < 1 || vol > maxVol) {
            embed.setDescription(`Type a number between 1 and ${maxVol}`)
         } else {
            await queue.setVolume(vol)
            embed.setDescription(`Set the volume to ${vol}`)
         }

         deleteMessage(await interaction.editReply({ embeds: [embed] }), 10000)
      } catch {
         console.log('❌  ✦ Set Volume Error')
      }
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
