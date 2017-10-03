const express = require('express')
const openfinLauncher = require('openfin-launcher')

const app = express()

app.use(express.static('dist'))

let localApp = app.listen(3000, () => {
    console.log('Listening on port 3000');
})
