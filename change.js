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
const moneyLabel = document.querySelector("#moneyLabel");
const moneyInput = document.querySelector("#moneyInput");
const submitButton = document.querySelector("#moneySubmit");
const costInput = document.querySelector("#costInput");
const costButton = document.querySelector("#costSubmit");

// Starting values
let startingNominals = [
    { name: "oneG", value: 5 },
    { name: "twoG", value: 5 },
    { name: "fiveG", value: 5 },
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
let cost = 0;

const handleSubmit = e => {
    e.stopPropagation();
    console.log("Total: ", startingNominals);
    console.log("Current: ", currentIncrementation);
    console.log("Value: ", currentValue);
    const amount = parseInt(moneyInput.value);
    if (amount) {
        startingNominals[currentIncrementation].value += amount;
        changeLabel(amount);
        currentIncrementation++;
    } else {
        changeLabel(amount);
        currentIncrementation++;
    }
};

submitButton.addEventListener("click", handleSubmit);

const handleChange = e => {
    e.stopPropagation();
    if (!costInput.value || parseFloat(costInput.value) === 0) {
        alert("Podaj koszt");
    } else {
        const amount = parseFloat(costInput.value).toFixed(2);
        cost = amount * 100;
        console.info("koszt: ", cost);
        console.info("reszta: ", currentValue - cost);
        console.info(sortValues())
    }
};

costButton.addEventListener("click", handleChange);

const changeLabel = value => {
    let amount = 0;
    if (value) {
        amount = parseInt(value);
    }
    switch (currentIncrementation) {
        case 0:
            moneyLabel.innerHTML = "Dwugroszówki";
            currentValue += amount;
            break;
        case 1:
            moneyLabel.innerHTML = "Pięciogroszówki";
            currentValue += amount * 2;
            break;
        case 2:
            moneyLabel.innerHTML = "Złotówki";
            currentValue += amount * 5;
            break;
        case 3:
            moneyLabel.innerHTML = "Dwuzłotówki";
            currentValue += amount * 100;
            break;
        case 4:
            moneyLabel.innerHTML = "Piątki";
            currentValue += amount * 200;
            break;
        case 5:
            moneyLabel.innerHTML = "Dzisiątki";
            currentValue += amount * 500;
            break;
        case 6:
            moneyLabel.innerHTML = "Dwudziestki";
            currentValue += amount * 1000;
            break;
        case 7:
            moneyLabel.innerHTML = "Pięćdziesiątki";
            currentValue += amount * 2000;
            break;
        case 8:
            moneyLabel.innerHTML = "Setki";
            currentValue += amount * 5000;
            break;
        case 9:
            moneyLabel.innerHTML = "Dwusetki";
            currentValue += amount * 10000;
            break;
        case 10:
            moneyLabel.innerHTML = "Pięćsetki";
            currentValue += amount * 20000;
            break;
        case 11:
            currentValue += amount * 50000;
        default:
            moneyInput.classList.add('hide');
            moneyLabel.classList.add('hide');
            submitButton.classList.add('hide');
    }
    totalValue += currentValue;
};

const sortValues = () => {
    let nominals = [...startingNominals];
    let max = nominals[0];
    return nominals;
}

const resetValues = () => {
    totalValue += currentValue;
    customerCount++;
    moneyLabel.innerHTML = "groszówki";
    currentIncrementation = 0;
    currentValue = 0;
};
