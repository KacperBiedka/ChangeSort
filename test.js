function wydaj()
{

let change = 4000;

//tablica dostepnych nominalow
    let nominals = [
        { name: "oneG", value: 0, nominal: 1 },
        { name: "twoG", value: 0, nominal: 2 },
        { name: "fiveG", value: 0, nominal: 5 },
        { name: "ones", value: 0, nominal: 100 },
        { name: "twos", value: 0, nominal: 200 },
        { name: "fives", value: 0, nominal: 500 },
        { name: "tens", value: 0, nominal: 1000 },
        { name: "twenties", value: 3, nominal: 2000 },
        { name: "fifties", value: 0, nominal: 5000 },
        { name: "hundreds", value: 0, nominal: 10000 },
        { name: "twohundreds", value: 0, nominal: 20000 },
        { name: "fivehundreds", value: 0, nominal: 50000 }
    ];

    if (!isNaN(change)) {

        var wynik = "Reszta to:\r\n";
        let i = nominals.length - 1;

        //dopoki nie wydano calej reszty
        while (change > 0 && i >= 0) {
            //sprawdz czy mozna wydac danym nominalem
            if (change >= nominals[i].nominal && nominals[i].value > 0) {
                let amount = Math.floor(change / nominals[i].nominal); //ile razy wydac dany nominal
                while (amount > nominals[i].value && amount >= 0) {
                    amount--;
                }
                change = Math.round(100 * (change - (nominals[i].nominal * amount))) / 100;     //zmniejsz reszte o wydany nominal
                wynik += nominals[i].name + "PLN x " + amount + "\r\n"; //wypisz wynik
            }
            i--;
        }
                //rozpatrz kolejny nominal
                console.log(wynik);
            } else {
                console.log('Podano nieprawidlowa wartosc!');
            }
        return false;
    }
wydaj();