module.exports = async (client, queue) => {
   try {
      if (queue.playerMessage) await queue.playerMessage.delete().catch(() => {})
      if (queue) await queue.stop()
   } catch {
      console.log('❌  ✦ 🥝 Disconnect Error')
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
