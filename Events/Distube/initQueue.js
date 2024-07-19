const { ActionRowBuilder, ButtonBuilder } = require('discord.js')
const { deleteMessage } = require('../../Functions')

module.exports = async (client, queue) => {
   try {
      await queue.voice.setSelfDeaf(false)
      await queue.setRepeatMode(2)
      await queue.setVolume(99)

      queue.actionRows = [
         new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerShuf', label: 'Mix', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerPrev', label: 'Back', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerStop', label: 'Stop', style: 4 }),
            new ButtonBuilder({ custom_id: 'playerSkip', label: 'Skip', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerLoop', label: 'Loop', style: 2 })
         ),
         new ActionRowBuilder().addComponents(
            new ButtonBuilder({ custom_id: 'playerQueue', label: 'List', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerPause', label: 'Halt', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerAdd', label: 'Add', style: 4 }),
            new ButtonBuilder({ custom_id: 'playerGrab', label: 'Grab', style: 2 }),
            new ButtonBuilder({ custom_id: 'playerClear', label: 'Clear', style: 2 })
         ),
      ]

      deleteMessage(await queue.textChannel.send({ embeds: [client.greeting[0]], components: [client.greeting[1]] }), 80000)
   } catch {
      console.log('❌  ✦ 🥝 InitQueue Error')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
