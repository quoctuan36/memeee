module.exports = async (client, queue) => {
   try {
      if (queue.listener) await queue.listener.stop()
      if (queue.playerMessage) await queue.playerMessage.delete().catch(() => {})
   } catch {
      console.log('❌  ✦ 🥝 FinishSong Error')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
