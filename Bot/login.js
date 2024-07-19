module.exports = async (client) => {
   client.login(client.config.token).catch(() => {
      console.log('❌   💔 ⬪ PLEASE PROVIDE A VALID TOKEN')
      process.exit(1)
   })
   
   setInterval(() => client.user.setPresence({
      status: client.config.presence.status || Math.random() < 0.6 ? 'online' : 'idle', 
      activities: [
         {
            name: Math.random() < 0.6 ? 'Pooba Saga 🌸' : 'Pooba Saga  🥝',
            state: Math.random() < 0.7 ? 'おまえはもう死んでる' : 'From Pooba Saga With 💖',
            type: Math.random() < 0.6 ? 2 : 3,
         },
         {
            name: Math.random() < 0.6 ? 'Genshin Impact' : 'Wuthering Waves',
            state: Math.random() < 0.7 ? 'おまえはもう死んでる' : 'From Pooba Saga With 💖',
            type: 0,
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
