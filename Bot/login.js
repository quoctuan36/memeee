module.exports = async (client) => {
   client.login(client.config.TOKEN).catch(() => {
      console.log('❌   💔 ⬪ PLEASE PROVIDE A VALID TOKEN')
      process.exit(1)
   })
   
   setInterval(() => client.user.setPresence({
      status: client.config.presence.status || Math.random() < 0.6 ? 'online' : 'idle', 
      activities: [
         {
            name: 'Pooba Saga 🌸',
            state: 'From Pooba Saga With 💖',
            type: 3,
         },
         {
            name: client.config.presence.name,
            state: client.config.presence.state,
            type: client.config.presence.type,
         },
      ],
   }), 24000)
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
