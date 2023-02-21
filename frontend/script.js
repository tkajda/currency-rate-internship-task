const url = 'http://localhost:8080/api/rate'

const plnGbpRateDisplay = document.getElementById('current-rate-display');

const plnField = document.getElementById('pln-field')
const gbpField = document.getElementById('gbp-field')
const loader = document.getElementById('loader')

let plnGbpRate = 0;

const updateOtherValue = (mode) => {
    if (mode === 'from-pln') {
        gbpField.value = Math.round(plnField.value / plnGbpRate * 100) / 100;
    } else if (mode === 'from-gbp') {
        plnField.value = Math.round(gbpField.value * plnGbpRate * 100) / 100;
    }
}

const getRate = async () => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(res => res.json());

    plnGbpRate = response; 
    plnGbpRateDisplay.innerHTML = response != undefined ? '1 GBP = ' + response + ' PLN' : 'Cannot find rate';
}

let timeout;

const debounce = (mode) => {
  clearTimeout(timeout);
  loader.style.display = 'block';
  timeout = setTimeout(() => {
    getRate();
    updateOtherValue(mode);
    loader.style.display = 'none';
  }, 750);
}

gbpField.addEventListener('input', () => debounce('from-gbp'));
plnField.addEventListener('input', () => debounce('from-pln'));

window.onload = async () => {
    getRate();
}