fin.desktop.InterApplicationBus.subscribe('*', 'context', (message) => {
    window.location.href = `https://finance.yahoo.com/quote/${message}`;
    
})
console.log('outside docready')

document.addEventListener("DOMContentLoaded", event => {
    console.log('inside docready')

   // setInterval(()=> {
        let one = document.getElementById('mrt-node-Lead-0-FinanceHeader')
        let two = document.getElementById('mrt-node-Lead-1-FeatureBar')
        let three = document.getElementById('YDC-UH');
        const hide = el => {
            if(el && el.style.display !== 'none') {
                el.style.display = 'none';
            }
        }
        console.log('before first hide');
        hide(one)
        hide(two)
        hide(three)
 //   },500);
})
