const express = require('express')
const openfinLauncher = require('openfin-launcher')

const app = express()

app.use(express.static('dist'))

let localApp = app.listen(5555, () => {
    console.log('Listening on Port 5555');
})
