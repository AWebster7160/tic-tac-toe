const createGameboard = (function() {
    const makeBoard = function(grid) {
        const board = [];
        for(i=0; i<(grid*grid); i++) {
            board.push('');
        }
        return board;
    }
    return { makeBoard };
})();

