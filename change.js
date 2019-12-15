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
const answerHeader = document.querySelector('.answer');

// Starting values
let startingNominals = [
    { name: "0.01", value: 0, nominal: 1 },
    { name: "0.02", value: 0, nominal: 2 },
    { name: "0.05", value: 0, nominal: 5 },
    { name: "0.1", value: 0, nominal: 10 },
    { name: "0.2", value: 0, nominal: 20 },
    { name: "0.5", value: 0, nominal: 50 },
    { name: "1", value: 0, nominal: 100 },
    { name: "2", value: 0, nominal: 200 },
    { name: "5", value: 0, nominal: 500 },
    { name: "10", value: 0, nominal: 1000 },
    { name: "20", value: 0, nominal: 2000 },
    { name: "50", value: 0, nominal: 5000 },
    { name: "100", value: 0, nominal: 10000 },
    { name: "200", value: 0, nominal: 20000 },
    { name: "500", value: 0, nominal: 50000 }
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
        alert("Podaj resztę");
    } else {
        const amount = parseFloat(costInput.value).toFixed(2);
        cost = amount * 100;
        console.info("reszta: ", cost);
        console.info(sortValues());
        if (amount * 100 < totalValue) {
            changeAlgorithm();
        } else {
            alert('Nie można wydać reszty');
        }
    }
};

const changeAlgorithm = () => {
    let nominals = startingNominals;
    let change = cost;
    if (!isNaN(change)) {
        let result = "";
        let i = nominals.length - 1;
        // Run as long as the change needs to be returned
        while (change > 0 && i >= 0) {
            // Check if the nominal can serve as a change and if the nominal is available
            if (change >= nominals[i].nominal && nominals[i].value > 0) {
                // Get the multiplier for the nominal that is smaller than the change
                let amount = Math.floor(change / nominals[i].nominal);
                // Subtract the amount if the multiplier is too high
                while (amount > nominals[i].value && amount >= 0) {
                    amount--;
                }
                // Subtract the nominal multiplied by amount from the total change
                change = Math.round(100 * (change - (nominals[i].nominal * amount))) / 100;
                nominals[i].value -= amount;
                // Apply the answer to the DOM
                result += nominals[i].name + " PLN x " + amount + ", ";
                answerHeader.innerText = result;
            }
            i--;
        }
        console.log(result);
        resetValues();
    } else {
        console.log('Podano nieprawidlowa wartosc!');
    }
    return false;
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
            moneyLabel.innerHTML = "Dziesięciogroszówki";
            currentValue += amount * 5;
            break;
        case 3:
            moneyLabel.innerHTML = "Dwudziestogroszówki";
            currentValue += amount * 10;
            break;
        case 4:
            moneyLabel.innerHTML = "Pięćdziesięciogroszówki";
            currentValue += amount * 20;
            break;
        case 5:
            moneyLabel.innerHTML = "Złotówki";
            currentValue += amount * 50;
            break;
        case 6:
            moneyLabel.innerHTML = "Dwuzłotówki";
            currentValue += amount * 100;
            break;
        case 7:
            moneyLabel.innerHTML = "Piątki";
            currentValue += amount * 200;
            break;
        case 8:
            moneyLabel.innerHTML = "Dziesiątki";
            currentValue += amount * 500;
            break;
        case 9:
            moneyLabel.innerHTML = "Dwudziestki";
            currentValue += amount * 1000;
            break;
        case 10:
            moneyLabel.innerHTML = "Pięćdziesiątki";
            currentValue += amount * 2000;
            break;
        case 11:
            moneyLabel.innerHTML = "Setki";
            currentValue += amount * 5000;
            break;
        case 12:
            moneyLabel.innerHTML = "Dwusetki";
            currentValue += amount * 10000;
            break;
        case 13:
            moneyLabel.innerHTML = "Pięćsetki";
            currentValue += amount * 20000;
            break;
        case 14:
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
};

const resetValues = () => {
    totalValue += currentValue;
    customerCount++;
    moneyLabel.innerHTML = "grosze";
    currentIncrementation = 0;
    currentValue = 0;
    moneyInput.value = null;
    costInput.value = null;
};
