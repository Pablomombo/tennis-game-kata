'use strict';

const TennisKata = function (player1Name, player2Name) {
    this.p1score = 0;
    this.p2score = 0;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
};

TennisKata.winPoint = function (player) {
    if (player === "player1") {
        this.p1score += 1;
    } else {
        this.p2score += 1;
    }
};

TennisKata.setScore = function () {
    let score = "";
    let tempScore = 0;
    if (this.p1score === this.p2score) {
        switch (this.p1score) {
            case 0:
                score = "Love-All";
                break;
            case 1:
                score = "Fifteen-All";
                break;
            case 2:
                score = "Thirty-All";
                break;
            default:
                score = "Deuce";
                break;
        }
    } else if (this.p1score >= 4 || this.p2score >= 4) {
        let result = this.p1score - this.p2score;
        if (result === 1) score = "Advantage player1";
        else if (result === -1) score = "Advantage player2";
        else if (result === 2) score = "Win for player1";
        else score = "Win for player2";
    } else {
        for (let i = 1; i < 3; i++) {
            if (i === 1) tempScore = this.p1score;
            else {
                score += "-";
                tempScore = this.p2score;
            }
            switch (tempScore) {
                case 0:
                    score += "Love";
                    break;
                case 1:
                    score += "Fifteen";
                    break;
                case 2:
                    score += "Thirty";
                    break;
                case 3:
                    score += "Fourty";
                    break;
            }
        }
    }
    return score;
};

module.exports = TennisKata;