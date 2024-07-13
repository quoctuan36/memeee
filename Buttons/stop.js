module.exports = {
   name: 'playerStop',
   run: async (interaction, queue) => {
      try {
         await queue.stop()
         await queue.playerMessage.delete()
      } catch {}
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
