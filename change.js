// Prevent unwanted signs
document
  .querySelector("#moneyInput")
  .addEventListener("keypress", function(evt) {
    if (
      (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
      evt.which > 57
    ) {
      evt.preventDefault();
    }
  });

// Global DOM elements
const moneyLabel = document.querySelector('#moneyLabel');
const moneyInput = document.querySelector('#moneyInput');
const submitButton = document.querySelector('#submitButton');

// Starting values
let startingNominals = [
    { name: "oneG", value: 5},
    { name: "twoG", value: 5},
    { name: "fiveG", value: 5},
    { name: "ones", value: 5 },
    { name: "twos", value: 5 },
    { name: "fives", value: 5 },
    { name: "tens", value: 5 },
    { name: "twenties", value: 5 },
    { name: "fifties", value: 5 },
    { name: "hundreds", value: 5 },
    { name: "twohundreds", value: 5 },
    { name: "fivehundreds", value: 5 }
];

let currentValue = 0;
let currentIncrementation = 0;
let totalValue = 0;
let customerCount = 0;

const handleSubmit = () => {
    console.log("Total: ", startingNominals);
    console.log("Current: ", currentIncrementation);
    console.log("Value: ",currentValue);
    const amount = moneyInput.value.trim();
    if (amount) {
        startingNominals[currentIncrementation].value += amount;
        currentIncrementation++;
        changeLabel(amount);
    }

}

const changeLabel = amount => {
    switch (currentIncrementation) {
        case 0:
          moneyLabel.innerHTML = 'Dwugroszówki'
          currentValue += amount;
        case 1:
          moneyLabel.innerHTML = 'Pięciogroszówki'
          currentValue += amount * 2;
        case 2:
          moneyLabel.innerHTML = 'Złotówki'
          currentValue += amount * 5;
        case 3:
          moneyLabel.innerHTML = 'Dwuzłotówki'
          currentValue += amount * 100;
        case 4:
          moneyLabel.innerHTML = 'Piątki'
          currentValue += amount * 200;
        case 5:
          moneyLabel.innerHTML = 'Dzisiątki'
          currentValue += amount * 500;
        case 6:
          moneyLabel.innerHTML = 'Dwudziestki'
          currentValue += amount * 1000;
        case 7:
          moneyLabel.innerHTML = 'Pięćdziesiątki'
          currentValue += amount * 5000;
        case 8:
          moneyLabel.innerHTML = 'Setki'
          currentValue += amount * 10000;
        case 9:
          moneyLabel.innerHTML = 'Dwusetki'
          currentValue += amount * 20000;
        case 10:
          moneyLabel.innerHTML = 'Pięćsetki'
          currentValue += amount * 50000;
        case 11:
          resetValues();
        default:
          console.info('sth went wrong');
    }
}

const resetValues = () => {
    totalValue += currentValue;
    customerCount++;
    moneyLabel.innerHTML = 'groszówki';
    currentIncrementation = 0;
    currentValue = 0;
}
