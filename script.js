function Gameboard(size) {
    const board = [];
    for (i = 0; i < size*size; i++) {
        board.push('');
    }
    const move = function(index) {
        if (currentPlayer = '') {
            currentPlayer = players[0];
        }
        if (currentPlayer === players[0]) {
            board.splice(index, 1, players[0].piece);
            this.switchPlayer();
        } else {
            board.splice(index, 1, players[1].piece);
            this.switchPlayer();
        }
    }
    let player1;
    let player2;
    let players = [
        {
            name: player1,
            piece: 'X'
        },
        {
            name: player2,
            piece: 'O'
        }
    ];
    const switchPlayer = function() { 
        players = players.reverse()
        return players;
    }
    return { board, move, players, switchPlayer };
}

const board1 = Gameboard(3);