function waysToReturnChange(denominations, numOfCoins, amount) {

    if(amount === 0) return 1; // Perfect!

    if(amount < 0) return 0; // No solution exists for negative amount

    if(numOfCoins < 0 && amount > 0) return 0; // We don't have coins left!

    console.log('checking ways to make ' + amount + ' with ' + denominations.slice(numOfCoins));

    return waysToReturnChange(denominations, numOfCoins, amount - denominations[numOfCoins]) +
        waysToReturnChange(denominations, numOfCoins - 1, amount);
}

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

function waysToReturnMemoize(amount) {
    // intialize an array of zeros with indices up to amount
    var waysOfDoingNcents = [];
    for (var i = 0; i <= amount; i++) {
        waysOfDoingNcents[i] = 0;
    }
    // there is 1 way to renturn 0 cents
    waysOfDoingNcents[0] = 1;

    for (var j = 0; j < startingNominals.length; j++) {
        // we can only start returning change with coins in our denominations
        var coin = startingNominals[j].value;

        // we start bottom up, each time reducing change amout with curr coin.
        for (var higherAmount = coin; higherAmount <= amount; higherAmount++) {
            var higherAmountRemainder = higherAmount - coin;
            // ways to create change is equivalent to reducing the problem to a known problem
            // and gaining all the ways to solve for smaller problems
            waysOfDoingNcents[higherAmount] += waysOfDoingNcents[higherAmountRemainder];
        }
    }

    return waysOfDoingNcents[amount];
}

var denominations = [1, 2, 3];
var amount = 4;
console.log(waysToReturnChange(denominations, denominations.length - 1, amount));
console.log(waysToReturnMemoize(amount));