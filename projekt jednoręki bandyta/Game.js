// link do gry: https://websamuraj.pl/examples/js/gra/ 

class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);

        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = document.querySelectorAll('div.color');
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGames = document.querySelector('.score span.number');
        this.spanWins = document.querySelector('.score span.win');
        this.spanLosses = document.querySelector('.score span.loss');

        this.render();
    }

    render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), result = '', wonMoney = 0, bid = 0, stats = [0, 0, 0]) {

        this.boards.forEach((board, index) => {
            board.style.backgroundColor = colors[index];
        });

        this.spanWallet.textContent = money;
        if (result) result = `Wygrałeś ${wonMoney}$. `;
        else if (!result && result !== '') result = `Przegrałeś ${bid}$. `;
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
    }

    startGame() {
        if (this.inputBid.value < 1) return alert('Kwota jest za mała, żeby zagrać.');

        const bid = Math.floor(this.inputBid.value);

        // sprawdzenie czy jest wystarczajaco srodków zeby zagrac
        if (!this.wallet.checkIfCanPlay(bid)) return alert('Masz za mało środków.');

        // zwraca tablice z resultem "maszyny"
        this.draw = new Draw();
        const draw = this.draw.drawResult();

        // sprawdzenie czy gracz wygrał
        const result = Result.checkWinner(draw);

        // pobranie wartości o jaką powiększyć portfel
        const wonMoney = Result.moneyWinInGame(result, bid);

        // odjęcie pieniedzy za jaka gra gracz
        this.wallet.changeWallet(bid, "-");

        // dodanie pieniedzy do portfela jesli gracz wygrał 
        // if (result) this.wallet.changeWallet(wonMoney); - nie musi być if bo będzie dodane 0 jesli nie wygrał
        this.wallet.changeWallet(wonMoney);

        // dodanie ruchu do statystyk
        this.stats.addGametoStatistics(result, bid);


        this.render(draw, this.wallet.getWalletValue(), result, wonMoney, bid, this.stats.showGameStatistics());

        this.inputBid.value = '';
    }
}