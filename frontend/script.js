const url = 'http://localhost:8080/api/rate'

const plnGbpRateDisplay = document.getElementById('current-rate-display');

const plnField = document.getElementById('pln-field');
const gbpField = document.getElementById('gbp-field');
const loader = document.getElementById('loader');

let plnGbpRate = 0;
let timeout;

const calculateAndUpdate = (mode) => {
    if (mode === 'from-pln') {
        if (plnField.value < 0) {
            alert('Please enter a positive number')
            return;
        }
        gbpField.value = Math.round(plnField.value / plnGbpRate * 100) / 100;
    } else if (mode === 'from-gbp') {
        if (gbpField.value < 0) {
            alert('Please enter a positive number')
            return;
        }
        plnField.value = Math.round(gbpField.value * plnGbpRate * 100) / 100;
    }
}

const showErrorMessage = (message) => {
  alert(message);
  plnGbpRateDisplay.innerHTML = message;
}

const getRate = async (mode) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) {
    showErrorMessage('Error sending request');
    return;
  }
  const data = await response.json();

  plnGbpRate = data;
  plnGbpRateDisplay.innerHTML = data != undefined ? '1 GBP = ' + data + ' PLN' : 'Cannot find rate';
  calculateAndUpdate(mode);
}

const debounce = (mode) => {
  clearTimeout(timeout);
  loader.style.display = 'block';
  timeout = setTimeout(() => {
    getRate(mode);
    loader.style.display = 'none';
  }, 750);
}

gbpField.addEventListener('input', () => debounce('from-gbp'));
plnField.addEventListener('input', () => debounce('from-pln'));

window.onload = async () => {
    getRate();
}