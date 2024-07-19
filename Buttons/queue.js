const { generateQueuePage, queueActionRow, capFirstChar } = require('../Functions')

module.exports = {
   name: 'playerQueue',
   run: async (interaction, queue) => {
      if (queue.songs.length > 1) {
         const songList = queue.songs.map((song) => ({
            name: song.name,
            url: song.url,
            duration: song.duration,
            isLive: song.isLive,
         }))
         const pageLength = 10
         const total = Math.ceil(songList.length / pageLength)
         let page = 1

         const queueMessage = await queue.textChannel.send({
            embeds: [generateQueuePage(interaction.client, queue, 0, page, total, pageLength, songList)],
            components: [queueActionRow(page, total)],
         })

         const collector = queueMessage.createMessageComponentCollector({ time: 60000 })
         collector.on('collect', async (button) => {
            await button.deferUpdate().catch(() => {})
            
            switch (button.customId) {
               case 'queueClose':
                  await queueMessage.delete().catch(() => {})
                  collector.stop()
                  return
               case 'queueFirst':
                  page = 1
                  break
               case 'queueBack':
                  page--
                  break
               case 'queueNext':
                  page++
                  break
               case 'queueLast':
                  page = total
                  break
            }

            await queueMessage
               .edit({
                  embeds: [generateQueuePage(interaction.client, queue, (page - 1) * pageLength, page, total, pageLength, songList)],
                  components: [queueActionRow(page, total)],
               })
               .catch(() => {})
         })

         collector.on('end', async () => {
            await queueMessage.edit({ components: [] }).catch(() => {})
         })

         queue.playerEmbed.setFooter({ text: `🪐 Queue Revealed by ${capFirstChar(interaction.user.globalName)}`, iconURL: interaction.user.avatarURL() })
      } else {
         queue.playerEmbed.setFooter({ text: `🪐 Queue Empty`, iconURL: interaction.user.avatarURL() })
      }
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
