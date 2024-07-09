module.exports = async (client) => {
   if (client.playerMessage) await client.playerMessage.delete().catch(() => {})
}