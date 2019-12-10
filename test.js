function wydaj()
{

let change = 4000;

//tablica dostepnych nominalow
    let nominals = [
        { name: "0.01", value: 0, nominal: 1 },
        { name: "0.02", value: 0, nominal: 2 },
        { name: "0.05", value: 0, nominal: 5 },
        { name: "1", value: 0, nominal: 100 },
        { name: "2", value: 0, nominal: 200 },
        { name: "5", value: 0, nominal: 500 },
        { name: "10", value: 0, nominal: 1000 },
        { name: "20", value: 3, nominal: 2000 },
        { name: "50", value: 0, nominal: 5000 },
        { name: "100", value: 0, nominal: 10000 },
        { name: "200", value: 0, nominal: 20000 },
        { name: "500", value: 0, nominal: 50000 }
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
