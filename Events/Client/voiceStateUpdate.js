const { refreshEmbed } = require('../../Functions')

module.exports = async (client, oldState, newState) => {
   try {
      if (newState.id === client.user.id) {
         const oldQueue = client.player.getQueue(oldState.guild.id)
         const newQueue = client.player.getQueue(newState.guild.id)

         if (oldQueue && newQueue && oldQueue.textChannel === newQueue.textChannel) {
            try {
               newQueue.playerEmbed.setDescription(newQueue.playerEmbed.data.description.replace(/<#\d+>/, `<#${newState.channelId}>`))
               newQueue.voice.setSelfDeaf(false)
            } catch {}
            
            await refreshEmbed(newQueue)
         }
      }
   } catch {
      console.log('❌  ✦ 🍉 VoiceStateUpdate Error')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
