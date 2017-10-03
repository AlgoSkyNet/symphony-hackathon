/* global fin */
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init () {
    fin.desktop.System.getVersion(version => {
        console.log(version);
    });
    const contextDiv = document.getElementById('context');
    fin.desktop.InterApplicationBus.subscribe('*', 'context', (message) => {
        contextDiv.innerText = message;
    });
}
