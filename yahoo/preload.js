fin.desktop.InterApplicationBus.subscribe('*', 'context', (message) => {
    window.location.href = `https://finance.yahoo.com/quote/${message}`;
    
    document.addEventListener("DOMContentLoaded", event => {
        document.getElementById('mrt-node-Lead-0-FinanceHeader').style.display='none';
        document.getElementById('mrt-node-Lead-1-FeatureBar').style.display='none';
        document.getElementById('YDC-UH').style.display='none';
    });
})