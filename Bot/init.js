const { Collection } = require('discord.js')
const fs = require('fs').promises

module.exports = async (client) => {
   await loadCommands(client, __dirname + '/../Commands')
   await loadEvents(client, client, __dirname + '/../Events/Client')
   await loadEvents(client, client.player, __dirname + '/../Events/Distube')
   await loadButtons(client, __dirname + '/../Buttons')
}

const loadCommands = async (client, path) => {
   client.commands = new Collection()
   client.interface = []

   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const command = require(`${path}/${file}`)

         client.commands.set(command.name, command)
         client.interface.push({
            name: command.name,
            description: command.description,
            options: command.options,
         })
         cleanCache(path, file)
      }
   } catch (e) {
      error(e)
   }
}

const loadEvents = async (client, emitter, path) => {
   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const eventName = file.split('.')[0]
         const event = require(`${path}/${file}`)

         emitter.on(eventName, event.bind(null, client))
         cleanCache(path, file)
      }
   } catch (e) {
      error(e)
   }
}

const loadButtons = async (client, path) => {
   client.buttons = new Collection()

   try {
      const files = await fs.readdir(path)

      for (const file of files) {
         const button = require(`${path}/${file}`)

         client.buttons.set(button.name, button.run)
         cleanCache(path, file)
      }
   } catch (e) {
      error(e)
   }
}

const cleanCache = (path, file) => delete require.cache[require.resolve(`${path}/${file}`)]
const error = (e) => {
   console.log(e)
   process.exit(1)
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
