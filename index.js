const express = require('express')


const server = express()
const PORT = 5000

server.listen(PORT, () => {
    console.log("chal gya hai server", PORT)
})