function Gameboard(size) {
    const gameArea = document.querySelector('.game-area');
    const gameInfo = document.querySelector('.game-info');
    const playerInfo = document.querySelector('.current-player');
    const replay = document.createElement('button');
    replay.setAttribute('class', 'replay');
    const body = document.querySelector('body');
    replay.textContent = 'Play Again?';
    let icon = document.createElement('img');
    icon.src = ('./img/x.svg');
    icon.setAttribute('id', 'icon');
    const x = document.createElement('img');
    x.src = ('./img/x.svg');
    x.setAttribute('id', 'x')
    const o = document.createElement('img');
    o.src = ('./img/o.svg');
    o.setAttribute('id', 'o');
    const boardCover = document.createElement('div');
    boardCover.setAttribute('id', 'board-cover');
    gameInfo.appendChild(icon);

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
        drawBoard();
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
        playerInfo.innerText = "Current Player:";
        return boards;
    }
    replay.addEventListener('click', () => {
            newBoard(3);
            replay.style.display = 'none'
            icon.style.display = 'revert';
            icon.src = ('./img/x.svg');
            if (players[0].piece == 'O') {
                players.reverse();
            }
        })
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
        let index = e.target.id;
        move(index);
        if (e.target.firstChild) {
            console.log('error')
            return;
        } else if(players[0].piece == 'O') {
            e.target.appendChild(x.cloneNode(true));
            showPiece();
        } else if (players[0].piece == 'X') {
            e.target.appendChild(o.cloneNode(true));
            showPiece();
        }
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
            playerInfo.innerText = 'Winner:'
            body.insertBefore(replay, gameArea);
            replay.style.display = 'revert';
            gameArea.appendChild(boardCover);
        } else if (boards.board.every((e) => e !== '')) {
            console.log('tie');
            playerInfo.innerText = 'Tie!';
            replay.style.display = 'revert';
            icon.style.display = 'none';
            body.insertBefore(replay, gameArea);
            gameArea.appendChild(boardCover);
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
    
    const showPiece = function() {
        if (players[0].piece == 'X') {
            icon.src = ('./img/o.svg');
        } else if (players[0].piece == 'O')
            icon.src = ('./img/x.svg');
    }

    return { boards, move, players, switchPlayer, newBoard, checkForWin, drawBoard, gameArea };
}

const board1 = Gameboard(3);
board1.drawBoard();