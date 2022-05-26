class Statistics {
    constructor() {
        this.gameResults = [];
    }

    addGametoStatistics(win, bid) {
        let gameResult = {
            win,
            bid
        }

        this.gameResults.push(gameResult);
    }

    showGameStatistics() {
        let games = this.gameResults.length;
        let wins = this.gameResults.filter(result => result.win).length;
        let losses = this.gameResults.filter(result => !result.win).length;

        // this.gameResults.forEach(game => {
        //     if (game.win) {
        //         wins++;
        //     } else {
        //         losses++;
        //     }
        // });

        return [games, wins, losses];
    }
}