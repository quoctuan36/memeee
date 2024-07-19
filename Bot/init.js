const fs = require('fs').promises

module.exports = async (client) => {
   await loadEvents(client, client, __dirname + '/../Events/Client')
   await loadEvents(client, client.player, __dirname + '/../Events/Distube')
   await loadCommands(client, __dirname + '/../Commands')
   await loadButtons(client, __dirname + '/../Buttons')
}

const loadEvents = async (client, emitter, path) => {
   try {
      const files = (await fs.readdir(path)).filter((file) => file.endsWith('.js'))
      await Promise.all(
         files.map(async (file) => {
            const eventName = file.split('.')[0]
            const func = require(path + '/' + file)

            emitter.on(eventName, func.bind(null, client))
            cleanCache(path, file)
         })
      )
   } catch (e) {
      emitError(e)
   }
}

const loadCommands = async (client, path) => {
   try {
      const files = (await fs.readdir(path)).filter((file) => file.endsWith('.js'))
      await Promise.all(
         files.map(async (file) => {
            const command = require(path + '/' + file)

            client.commands.set(command.name, command)
            client.interface.push({ name: command.name, description: command.description, options: command.options })

            cleanCache(path, file)
         })
      )
   } catch (e) {
      emitError(e)
   }
}

const loadButtons = async (client, path) => {
   try {
      const files = (await fs.readdir(path)).filter((file) => file.endsWith('.js'))
      await Promise.all(
         files.map(async (file) => {
            const button = require(path + '/' + file)

            client.buttons.set(button.name, button.run)
            cleanCache(path, file)
         })
      )
   } catch (e) {
      emitError(e)
   }
}

const cleanCache = (path, file) => {
   delete require.cache[require.resolve(path + '/' + file)]
}
const emitError = (error) => {
   console.log(error)
   process.exit(1)
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
