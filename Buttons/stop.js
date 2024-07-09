module.exports = {
   name: 'playerStop',
   run: async (client, interaction, queue) => {
      await queue.stop()
      await client.playerMessage.delete()
   }
}