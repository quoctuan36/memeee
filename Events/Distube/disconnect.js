module.exports = async (client, queue) => {
   if (queue.playerMessage) {
      await queue.playerMessage.delete().catch(() => {})
      await queue.stop()
   }
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
