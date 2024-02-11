function Gameboard(size) {


    let board = [];
    for (i = 0; i < size*size; i++) {
        board.push('');
    }

    const newBoard = function(size) {
        let board = [''];
        for (i = 0; i < (size*size)-1; i++) {
            board.push('');
        }
        return board;
    }

    const move = function(index) {
        if (board[index] === '') {
            board.splice(index, 1, players[0].piece);
            this.switchPlayer();
            console.log(players[0].name)
    }}



    let player1 = 'alex';
    let player2 = 'opponent';
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
    
    return { board, move, players, switchPlayer, newBoard };
}

const board1 = Gameboard(3);