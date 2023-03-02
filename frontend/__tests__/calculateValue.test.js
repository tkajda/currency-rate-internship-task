document.body.innerHTML = 
  '<input min="0" step="0.01" id="gbp-field">' +
  '<input min="0" step="0.01" id="pln-field">';

jest.spyOn(window, 'alert').mockImplementation(() => {});
const plnField = document.getElementById('pln-field');
const gbpField = document.getElementById('gbp-field');

const { calculateValue, isCorrectData }  = require('../script');


describe('validateData test', () => {
  it('validate string containing only letters', () => {
    plnField.value = 'basb';
    const result = isCorrectData('from-pln');
    expect(result).toBe(false);
  });

  it('validate string containing letters and digits', () => {
    plnField.value = '812a';
    const result = isCorrectData('from-pln');
    expect(result).toBe(false);
  });

  it('validate string contating only digits', () => {
    gbpField.value = '812';
    const result = isCorrectData('from-gbp');
    expect(result).toBe(true);
  });

  it('validate empty string', () => {
    gbpField.value = '';
    const result = isCorrectData('from-gbp');
    expect(result).toBe(true);
  });

  it('validate negative number', () => {
    gbpField.value = '-15';
    const result = isCorrectData('from-gbp');
    expect(result).toBe(false);
  });

});


describe('calculateValue test', () => {
  it('calculateValue should convert from PLN to GBP correctly', () => {
    plnField.value = 100;
    window.plnGbpRate = 5.1118;
    const result = calculateValue('from-pln');
    expect(result).toBe(19.56);
  });

  it('calculateValue should convert from GBP to PLN correctly', () => {
    gbpField.value = 19.1;
    window.plnGbpRate = 5.4209;
    const result = calculateValue('from-gbp');
    expect(result).toBe(103.54);
  });
});