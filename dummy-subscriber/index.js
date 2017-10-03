const express = require('express');
const app = express();
const openfinLauncher = require('openfin-launcher');

app.use(express.static('public'));

let localServer = app.listen(8888, () => {
    console.log('Application hosted locally on port 8888');
    openfinLauncher.launchOpenFin({
        configPath: 'http://localhost:8888/app.json'
    }).then(() => {
        localServer.close();
    }).fail((error) => {
        console.log('Launch error: ' + error);
    });
});
