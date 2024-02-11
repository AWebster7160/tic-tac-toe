function Gameboard(size) {
    const gameArea = document.querySelector('.game-area');
    const x = document.createElement('img');
    x.src = ('./img/x.svg');
    const o = document.createElement('img');
    o.src = ('./img/o.svg');
    let boards = {
        board: [],
        boardRow: [],
        boardColumn: [],
        boardDiagonal: [],
    }
    
    for (let i = 0; i < size * size; i++) {
        boards.board.push('');
    }

    for (let i = 0; i < size; i++) {
        boards.boardRow[i] = [];
        for (let j = 0; j < size; j++) {
            boards.boardRow[i].push('');
        }
    }
    for (let i = 0; i < size; i++) {
        boards.boardColumn[i] = [];
        for (let j = 0; j < size; j++) {
            boards.boardColumn[i].push('');
        }
    }
    for (let i = 0; i < size-1; i++) {
        boards.boardDiagonal[i] = [];
        for (let j = 0; j < size; j++) {
            boards.boardDiagonal[i].push('');
        }
    }
    const newBoard = function(size) {
        while(gameArea.firstChild) {
            gameArea.removeChild(gameArea.lastChild)
        }
        gameArea.style.display = 'none';
        this.drawBoard();
        size = 3;
        boards.board = [];
        boards.boardColumn = [];
        boards.boardRow = [];
        boards.boardDiagonal = [];
        for (i = 0; i < (size*size); i++) {
            boards.board.push('');
        }
        for (let i = 0; i < size; i++) {
            boards.boardRow[i] = [];
            for (let j = 0; j < size; j++) {
                boards.boardRow[i].push('');
            }
        }
        for (let i = 0; i < size; i++) {
            boards.boardColumn[i] = [];
            for (let j = 0; j < size; j++) {
                boards.boardColumn[i].push('');
            }
        }
        for (let i = 0; i < size-1; i++) {
            boards.boardDiagonal[i] = [];
            for (let j = 0; j < size; j++) {
                boards.boardDiagonal[i].push('');
            }
        }
        
        return boards;
    }

    const drawBoard = (function() {
        gameArea.style.display = 'grid'
        for (let i = 0; i < 3 * 3; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('class', 'cell');
        cell.setAttribute('id', `${i}`);
        gameArea.appendChild(cell);
        }
    });

    gameArea.addEventListener('click', (e) => { 
        index = e.target.id;
        if (e.target.firstChild) {
            return;
        } else if(players[0].piece == 'X') {
            e.target.appendChild(x.cloneNode(true));
        } else if (players[0].piece == 'O') {
            e.target.appendChild(o.cloneNode(true));
        }
        move(index);
    })
    const move = function(index) {
        if (boards.board[index] === '') {
            boards.board.splice(index, 1, players[0].piece);
            if (index == 0) {
                boards.boardRow[0][0] = players[0].piece;
                boards.boardColumn[0][0] = players[0].piece;
                boards.boardDiagonal[0][0] = players[0].piece;
            } else if (index == 1) {
                boards.boardRow[0][1] = players[0].piece;
                boards.boardColumn[1][0] = players[0].piece;
            } else if (index == 2) {
                boards.boardRow[0][2] = players[0].piece;
                boards.boardColumn[2][0] = players[0].piece;
                boards.boardDiagonal[1][0] = players[0].piece;
            } else if (index == 3) {
                boards.boardRow[1][0] = players[0].piece;
                boards.boardColumn[0][1] = players[0].piece;
            } else if (index == 4) {
                boards.boardRow[1][1] = players[0].piece;
                boards.boardColumn[1][1] = players[0].piece;
                boards.boardDiagonal[0][1] = players[0].piece;
                boards.boardDiagonal[1][1] = players[0].piece;
            } else if (index == 5) {
                boards.boardRow[1][2] = players[0].piece;
                boards.boardColumn[2][1] = players[0].piece;
            } else if (index == 6) {
                boards.boardRow[2][0] = players[0].piece;
                boards.boardColumn[0][2] = players[0].piece;
                boards.boardDiagonal[1][2] = players[0].piece;
            } else if (index == 7) {
                boards.boardRow[2][1] = players[0].piece;
                boards.boardColumn[1][2] = players[0].piece;
            } else if (index == 8) {
                boards.boardRow[2][2] = players[0].piece;
                boards.boardColumn[2][2] = players[0].piece;
                boards.boardDiagonal[0][2] = players[0].piece;
            }
            checkForWin();
            console.log(`${players[0].name} placed an ${players[0].piece} on board[${index}]`);
            switchPlayer();
            
        } else {
            console.log('Invalid move');
        }
    }

    const checkForWin = function() {
        const winRow = boards.boardRow.some((line) => line.every((e) => e === line[0] && e !== ''));
        const winCol = boards.boardColumn.some((line) => line.every((e) => e === line[0] && e !== ''));
        const winDiag = boards.boardDiagonal.some((line) => line.every((e) => e === line[0] && e !== ''));
        if (winRow == true || winCol == true || winDiag == true) {
            console.log('winner!');
            grid.rem
        } else if (boards.board.every((e) => e !== '')) {
            console.log('tie');
        }
    }

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
    
    return { boards, move, players, switchPlayer, newBoard, checkForWin, drawBoard, gameArea };
}

const board1 = Gameboard(3);
board1.drawBoard();