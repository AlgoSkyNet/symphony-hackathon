fin.desktop.InterApplicationBus.subscribe('*', 'context', (message) => {
    window.location.href = `https://finance.yahoo.com/quote/${message}`;
    
})

document.addEventListener("DOMContentLoaded", event => {
    setInterval(()=> {
        let one = document.getElementById('mrt-node-Lead-0-FinanceHeader')
        let two = document.getElementById('mrt-node-Lead-1-FeatureBar')
        let three = document.getElementById('YDC-UH');
        let four = document.getElementById('Nav-0-DesktopNav');
        const hide = el => {
            if(el & el.style.display !== 'none') {
                el.style.display = 'none';
            }
        }
        hide(one);
        hide(two);
        hide(three);
        hide(four);
    },500);
})
