const { Routes, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js')

module.exports = async (client) => {
   console.log('\x1b[31m%s\x1b[0m', '✔️   ✦ 💖 From Pooba Saga With Luv')
   console.log('\x1b[32m%s\x1b[0m', '✔️   ✦ 🍕 Logged in as -- ' + client.user.username)

   await client.rest.put(Routes.applicationCommands(client.user.id), { body: client.interface })

   client.greeting = [
      new EmbedBuilder()
         .setColor(client.config.player.embedColor)
         .setThumbnail(client.config.player.embedGif)
         .setDescription(
            '✦ Wish you a happy music time, moah moah\n' +
            '✦ Click buttons below for more info\n' +
            '✦ From Pooba Saga with luv\n' +
            '✦ ' + client.user.username + ' :3'
         ),

      new ActionRowBuilder().addComponents(
         new ButtonBuilder({ label: 'Invite Me', style: 5 }).setURL(client.config.invite.inviteUrl).setDisabled(!client.config.invite.inviteStatus),
         new ButtonBuilder({ label: 'Join Server', style: 5 }).setURL(client.config.invite.inviteGuild)
      ),
   ]
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
