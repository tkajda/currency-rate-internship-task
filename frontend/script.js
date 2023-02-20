const url = 'http://localhost:8080/api/rate'

const currentRateDisplay = document.getElementById('current-rate-display');

const plnField = document.getElementById('pln-field')
const gbpField = document.getElementById('gbp-field')

let currentRate = 0;


window.onload = async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json())
    currentRate = response; 
    // currentRateDisplay.innerText += response != undefined ? response : 'NaN';
    currentRateDisplay.innerHTML = response != undefined ? '1 GBP = ' + response + ' PLN' : 'Cannot find rate';
    
    console.log('Page Loaded');
}

const updateOtherValue = (which) => {
    if (which === 'pln-field') {
        gbpField.value = Math.round(plnField.value * currentRate * 100) / 100;
    } else if (which === 'gbp-field') {
        plnField.value = Math.round(gbpField.value * currentRate * 100) / 100;
    }
}


gbpField.addEventListener("input", () => updateOtherValue('gbp-field'));
plnField.addEventListener("input", () => updateOtherValue('pln-field'));


