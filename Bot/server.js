const express = require('express')

module.exports = () => {
   const app = express()
   const PORT = 4000

   app.get('/', (req, res) => { res.sendFile('./z.html', { root: __dirname }) })
   app.listen(PORT, () => { console.log('\x1b[33m%s\x1b[0m', `✔️    🍕 ⬪ http://localhost:${PORT}`) })
}









// ─────・ F R O M  R Y O K R  W I T H  L U V ❤️‍🔥・───── //
