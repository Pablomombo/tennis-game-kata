const TennisKata = require("./TennisKata.js");

const allScores = [
    [0, 0, "Love-All"],
    [1, 1, "Fifteen-All"],
    [2, 2, "Thirty-All"],
    [3, 3, "Deuce"],
    [4, 4, "Deuce"],

    [1, 0, "Fifteen-Love"],
    [2, 0, "Thirty-Love"],
    [3, 0, "Forty-Love"],
    [4, 0, "Win for player1"],
    [0, 1, "Love-Fifteen"],
    [0, 2, "Love-Thirty"],
    [0, 3, "Love-Forty"],
    [0, 4, "Win for player2"],

    [2, 1, "Thirty-Fifteen"],
    [3, 1, "Forty-Fifteen"],
    [4, 1, "Win for player1"],
    [1, 2, "Fifteen-Thirty"],
    [1, 3, "Fifteen-Forty"],
    [1, 4, "Win for player2"],

    [3, 2, "Forty-Thirty"],
    [4, 2, "Win for player1"],
    [2, 3, "Thirty-Forty"],
    [2, 4, "Win for player2"],

    [4, 3, "Advantage player1"],
    [5, 4, "Advantage player1"],
    [6, 5, "Advantage player1"],
    [7, 6, "Advantage player1"],
    [16, 15, "Advantage player1"],
    [3, 4, "Advantage player2"],
    [4, 5, "Advantage player2"],
    [5, 6, "Advantage player2"],
    [6, 7, "Advantage player2"],
    [15, 16, "Advantage player2"],

    [6, 4, "Win for player1"],
    [17, 15, "Win for player1"],
    [4, 6, "Win for player2"],
    [15, 17, "Win for player2"]
];

const checkScore = function(referee, TennisKata, player1Score, player2Score, expectedScore) {
    let highestScore = Math.max(player1Score, player2Score),
        game,
        result,
        message = "",
        good = false,
        i;
    
    try {
        game = new TennisKata("player1", "player2");
        for (i = 0; i < highestScore; i++) {
            if (i < player1Score) {
                game.winPoint("player1");
            }
            if (i < player2Score) {
                game.winPoint("player2");
            }
        }
        result = game.setScore();
    
        if (result === expectedScore) {
            good = true;
        } else {
            message = "Result = '" + result + "'";
        }
    } catch (ex) {
        message = "Exception: " + ex;
    }
    referee.addCase(expectedScore, good, message);
};

const runSuiteOnKata = function(referee, TennisKata, title) {
    referee.addSuite(title);
    allScores.forEach(function(score) {
        checkScore(referee, TennisKata, score[0], score[1], score[2]);
    });
};

const getConsoleReferee = function() {
    let referee = {
        errors: 0,
        addSuite: function(title) {
            console.log("Running suite '" + title + "'...");
        },
        addCase: function(title, good, message) {
            if (!good) {
                console.log("Case '" + title + "': " + message);
                this.errors++;
            }
        },
        done: function() {
            if (this.errors > 0) {
                console.log("Got " + this.errors + " failure(s)!");
            } else {
                console.log("Done, all OK ");
            }
        }
    };
    return referee;
};

let referee = null;

referee = getConsoleReferee();

runSuiteOnKata(referee, TennisKata, "TennisKata");
referee.done();