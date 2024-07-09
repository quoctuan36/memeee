module.exports = async (client, queue) => {
   if (client.playerMessage) {
      await client.playerMessage.delete().catch(() => {})
      await queue.stop()
   }
}