const url = 'http://localhost:8080/api/rate';

const plnGbpRateDisplay = document.getElementById('current-rate-display');
const plnField = document.getElementById('pln-field');
const gbpField = document.getElementById('gbp-field');
const loader = document.getElementById('loader');

//for testing purposes
window.plnGbpRate = 0;

let timeout;

const hasOnlyDigits = (string) => {
  return /^\d+$/.test(string) && string.length > 0 ;
}

const isCorrectData = (mode) => {
  const fieldValue = mode === 'from-pln' ? plnField.value : gbpField.value;

  if (fieldValue.length > 0 && (fieldValue < 0 || !hasOnlyDigits(fieldValue))) {
    alert('Please enter a positive number');
    plnField.value = '';
    gbpField.value = '';
    return false;
  }
  return true;
};

const calculateValue = (mode) => {
  let fieldValue = mode === 'from-pln' ? plnField.value : gbpField.value;
  fieldValue = parseFloat(fieldValue);
  let plnGbpRate = window.plnGbpRate;
  
  const result = mode === 'from-pln' ? fieldValue / plnGbpRate : fieldValue * plnGbpRate;

  return Math.round(result * 100) / 100;
}

const updateValue =  (mode, val) => {
  if (mode === 'from-pln') {
    gbpField.value = val;
  } else if (mode === 'from-gbp') {
      plnField.value = val;
  }
}

const handleErrorMessage = (message, mode) => {
  alert(message);
  updateValue(mode, 'NaN');
  plnGbpRateDisplay.innerHTML = message;
}

const fetchRate = async (mode) => {
  const response = await fetch(url)
  .catch(err => {
    handleErrorMessage(err.message, mode);
    return;
  });

  const data = response != undefined ? await response.json() : undefined;
  plnGbpRate = data;

  plnGbpRateDisplay.innerHTML = data != undefined ? '1 GBP = ' + data + ' PLN' : 'Cannot fetch exchange rate';
  updateValue(mode, calculateValue(mode));
}

const debounce = (mode) => {
  clearTimeout(timeout);
  if (isCorrectData(mode)) {
    loader.style.display = 'block';
    timeout = setTimeout(() => {
      fetchRate(mode);
      loader.style.display = 'none';
    }, 750);
  }
}

window.onload = () => {
  if(typeof window !== 'undefined') {
    gbpField.addEventListener('input', () => debounce('from-gbp'));
    plnField.addEventListener('input', () => debounce('from-pln'));
  }
  fetchRate();
}

module.exports = { calculateValue, isCorrectData };
