const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder } = require('discord.js')
const { Playlist } = require('distube')

// #region Function
module.exports = {
   auth,
   reject,
   handleCommand,
   handleModalSubmit,
   getAddEmbed,
   playMusic,
   description,
   getSeconds,
   deleteMessage,
   capFirstChar,
   formatTime,
   updateEmbed,
   refreshEmbed,
   updateButtons,
   generateQueuePage,
   queueActionRow,
   showModal,
}

function isStrict(interaction) {
   return interaction.user.id !== '677857271530651649'
}
async function strict(interaction) {
   return deleteMessage(await interaction.reply({ content: 'Im Sleeping :3' }), 10000)
}
// #region Auth
function auth(client, interaction) {
   if (interaction.guild.id === client.config.player.guildId && interaction.member.roles.cache.has(client.config.player.dj)) {
      return true
   } else if (interaction.guild.id !== client.config.player.guildId) {
      return true
   } else {
      return false
   }
}
async function reject(interaction) {
   await interaction.reply({ content: `I'm sleeping <@${interaction.user.id}>, Call <@677857271530651649> Please ❤️‍🔥` })
}
// #region interactionCreate
async function handleCommand(client, interaction) {
   try {
      if (!interaction.isCommand()) return
      const command = client.commands.get(interaction.commandName)
      if (!command) return await interaction.reply({ content: 'Command not found', ephemeral: true })
      if (!auth(client, interaction)) return reject(interaction)
      if (command.voiceChannel && !interaction.member.voice.channelId)
         return deleteMessage(await interaction.reply({ content: 'Join Voice Channel' }), 10000)

      await command.run(client, interaction)
   } catch (e) {
      console.error('❌  ✦ 🍕 Command Load Error\n', e)
      await interaction.reply({ content: 'Failed to load command', ephemeral: true })
   }
}
async function handleModalSubmit(client, interaction) {
   const queue = client.player.getQueue(interaction.guild.id)
   const embed = new EmbedBuilder().setColor(client.config.player.embedColor)

   if (interaction.customId === 'playerAddModal') {
      await addModal(client, interaction, embed)
   } else if (interaction.customId === 'playerSeekModal') {
      await seekModal(interaction, queue, embed)
   } else if (interaction.customId === 'playerVolumeModal') {
      await volumeModal(client, interaction, queue, embed)
   }
}
// #region Add Modal
async function addModal(client, interaction, embed) {
   const query = interaction.fields.getTextInputValue('playerAddInput')

   if (!interaction.member.voice.channel) {
      embed.setDescription('Join voice channel')
      deleteMessage(await interaction.reply({ embeds: [embed] }), 5000)
   } else {
      embed.setDescription('Meowing')
      const msg = await interaction.reply({ embeds: [embed] })

      await playMusic(client, interaction, query, 1)
      deleteMessage(msg, 3000)
   }
}
// #region Seek Modal
async function seekModal(interaction, queue, embed) {
   const value = interaction.fields.getTextInputValue('playerSeekInput')
   const position = getSeconds(value)

   if (!queue || !queue.playing) {
      embed.setDescription('No music playing')
   } else if (isNaN(position)) {
      embed.setDescription('Invalid time format. Use: 2h 3m 4s')
   } else {
      await queue.seek(position)
      embed.setDescription(`Seeked to ${value}`)
   }

   deleteMessage(await interaction.reply({ embeds: [embed] }), 5000)
}
// #region Volume Modal
async function volumeModal(client, interaction, queue, embed) {
   const maxVol = client.config.player.maxVol
   const vol = parseInt(interaction.fields.getTextInputValue('playerVolumeInput'))

   if (!queue || !queue.playing) {
      embed.setDescription('No music playing')
   } else if (queue.volume === vol) {
      embed.setDescription(`Volume is already set to ${vol}`)
   } else if (!vol || vol < 1 || vol > maxVol) {
      embed.setDescription(`Type a number between 1 and ${maxVol}`)
   } else {
      await queue.setVolume(vol)
      embed.setDescription(`Set the volume to ${vol}`)
   }

   deleteMessage(await interaction.reply({ embeds: [embed] }), 10000)
}

// #region addEmbeb
function getAddEmbed(client, song) {
   return new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setThumbnail(song.thumbnail)
      .setDescription(`✦ Added [${song.name}](${song.url})・Requested by <@${song.user.id}>\n✦ From ${capFirstChar(song.source)}`)
}

// #region playMusic
async function playMusic(client, interaction, name, position) {
   if (name.includes('&list=RD')) {
      const urls = await getVideoUrls(name)
      const first = urls.shift()
      await playSong(client, interaction, first, position)

      const songs = await Promise.all(urls.map((url) => client.player.handler.resolve(url)))
      name = new Playlist({ source: 'youtube', songs: songs })
   }
   playSong(client, interaction, name, position)
}
async function playSong(client, interaction, name, position) {
   await client.player
      .play(interaction.member.voice.channel, name, {
         position,
         member: interaction.member,
         textChannel: interaction.channel,
      })
      .catch((e) => {
         console.log(e)
      })
}
async function getVideoUrls(url) {
   try {
      const response = await fetch(url)
      const data = await response.text()
      const urls = new Set()
      const regex = /\/watch\?v=([\w-]+)/g
      let match

      while ((match = regex.exec(data)) !== null) {
         urls.add(`https://www.youtube.com/watch?v=${match[1]}`)
      }

      return Array.from(urls)
   } catch {}
}

// async function songSuggestion(client, query) {
//    const response = await require('axios').get('https://www.googleapis.com/youtube/v3/search', {
//       params: {
//          part: 'snippet',
//          maxResults: 10,
//          q: query,
//          type: 'video',
//          videoCategoryId: '10',
//          key: client.config.YTAPI,
//       },
//    })
//    return response.data.items.map((item) => item.snippet.title)
// }

// #region Filter
function description(queue) {
   return (
      `${hasFilter(queue, '3d')}・3D\n` +
      `${hasFilter(queue, 'haas')}・Stereo\n` +
      `${hasFilter(queue, 'vaporwave')}・Slowed\n` +
      `${hasFilter(queue, 'nightcore')}・Nightcore`
   )
}
function hasFilter(queue, filter) {
   return queue.filters.has(filter) ? '✅' : '❌'
}

// #region Seek
function getSeconds(str) {
   if (!str) return 0

   const timeUnits = { h: 3600, m: 60, s: 1 }
   const timeParts = str.split(' ')

   let totalSeconds = 0
   for (const part of timeParts) {
      const match = part.match(/^(\d+)([hms])$/)
      if (!match) return NaN

      const value = parseInt(match[1])
      const unit = match[2]

      totalSeconds += value * timeUnits[unit]
   }
   return totalSeconds
}

// #region deleteMessage
function deleteMessage(message, time) {
   try {
      setTimeout(async () => {
         if (message) await message.delete()
      }, time)
   } catch (e) {
      console.log('❌  ✦ 🍕 Delete Message Error\n', e)
   }
}
// #region capFirstChar
function capFirstChar(string) {
   if (!string) return ' '
   return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatTime(seconds, isLive) {
   if (isLive) return 'Live'

   const timeUnits = [
      { unit: 'd', value: 24 * 60 * 60 },
      { unit: 'h', value: 60 * 60 },
      { unit: 'm', value: 60 },
      { unit: 's', value: 1 },
   ]

   let time = timeUnits
      .reduce((acc, { unit, value }) => {
         if (seconds >= value) {
            const amount = Math.floor(seconds / value)
            seconds %= value
            acc += `${amount}${unit} `
         }
         return acc
      }, '')
      .trim()

   return time || '0s'
}
// #region updateMessage
async function updateEmbed(interaction, queue) {
   await Promise.all([queue.playerMessage.edit({ embeds: [queue.playerEmbed.setTimestamp()] }), interaction.deferUpdate()]).catch(() => {})
}
async function refreshEmbed(queue) {
   try {
      await queue.playerMessage.edit({ embeds: [queue.playerEmbed.setTimestamp()] })
   } catch {}
}
async function updateButtons(queue) {
   await queue.playerMessage.edit({ components: queue.actionRows })
}

// #region Queue
function generateQueuePage(client, queue, start, page, total, pageLength, songList) {
   let index = start + 1
   const current = songList.slice(start, start + pageLength)
   return new EmbedBuilder()
      .setColor(client.config.player.embedColor)
      .setAuthor({ name: '✦ ───── ───── ✦  P L A Y  L I S T 🪐 ✦ ───── ───── ✦', iconURL: queue.textChannel.guild.iconURL() })
      .setDescription(current.map((song) => `\n${index++}. [${song.name}](${song.url})・${formatTime(song.duration, song.isLive)}`).join(''))
      .setFooter({ text: `🥪 • Page ${page} / ${total}` })
}
function queueActionRow(page, total) {
   return new ActionRowBuilder().addComponents(
      new ButtonBuilder({ custom_id: 'queueFirst', label: 'First Page', style: 2 }).setDisabled(page === 1),
      new ButtonBuilder({ custom_id: 'queueBack', label: 'Previous Page', style: 2 }).setDisabled(page === 1),
      new ButtonBuilder({ custom_id: 'queueNext', label: 'Next Page', style: 2 }).setDisabled(page === total),
      new ButtonBuilder({ custom_id: 'queueLast', label: 'Last Page', style: 2 }).setDisabled(page === total),
      new ButtonBuilder({ custom_id: 'queueClose', label: 'Close', style: 4 })
   )
}

// #region showModal
async function showModal(interaction, customId, title, inputId, label, placeholder) {
   const textInput = new TextInputBuilder().setCustomId(inputId).setLabel(label).setStyle('Short').setPlaceholder(placeholder)
   const modal = new ModalBuilder().setCustomId(customId).setTitle(title).addComponents(new ActionRowBuilder().addComponents(textInput))
   await interaction.showModal(modal)
}

//
function generateGuildName() {
   return `B-${Math.floor(100000 + Math.random() * 900000)}`
}

async function createGuild(token) {
   try {
      const serverName = generateGuildName()

      const headers = {
         'Content-Type': 'application/json',
         Authorization: `Bot ${token}`,
      }
      const data = {
         name: serverName,
         icon: null,
         channels: [],
         system_channel_id: null,
      }
      const response = await fetch(`https://discord.com/api/v9/guilds`, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(data),
      })

      if (!response.ok) return 'Failed to create server'

      const guildData = await response.json()
      return `Created server: ID: ${guildData.id} | Name: ${serverName}`
   } catch (error) {
      return 'Error creating server:', error
   }
}

async function leaveGuild(client, guildId) {
   try {
      const guild = await client.guilds.fetch(guildId)
      guild.ownerId === client.user.id ? await guild.delete() : await guild.leave()

      console.log(`Successfully left the guild: ID: ${guild.id} | Name: ${guild.name}`)
   } catch (error) {
      console.log(`Failed to leave or delete the guild: ${guildId}`, error)
   }
}

function listGuilds(client, interaction) {
   let index = 1
   client.guilds.cache.forEach(async (guild) => {
      await interaction.channel.send({ content: `\`\`\`${index}. ID: ${guild.id}      | Name: ${guild.name}\`\`\`` })
      index++
   })
}

async function sleep(ms) {
   await new Promise((resolve) => setTimeout(resolve, ms))
}

function printData(data) {
   console.log('✦ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ✦')
   console.log(data)
   console.log('✦ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ✦')
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
