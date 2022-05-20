const gameBoard = (() => {
    const space = (content) => {
        const isSpaceEmpty = () => {
            if(space.content === '') {
                return true;
            } else {
                return false;
            }
        };
        return {content, isSpaceEmpty};
    };

    const draw = () => {
        for(let i = 0; i < BOARDSIZE; i++) {
            board.push(space(''));
            renderSpace(i);
        }
    };

    const renderSpace = (number) => {
        let singleSpace = document.createElement('div');
        singleSpace.setAttribute('id', `space-${number}`);
        singleSpace.classList.add('space');
        document.querySelector('.gameboard').appendChild(singleSpace);
    };

    const updateSpace = (number) => {
        document.querySelector(`#space-${number}`).textContent = board[number].content;
    };

    const board = [];
    const BOARDSIZE = 9;

    return {draw, board, space, updateSpace};
})();

const player = (playerMove) => {
    const move = () => {
        return playerMove;
    };
    const showName = () => {
        return `Player ${playerMove.toUpperCase()}`;
    };

    return {move, showName};
};

const game = (() => {
    const playerO = player('o');
    const playerX = player('x');

    let thisRound = 1;

    const whosTurn = (currentRound) => {
        if(currentRound % 2 == 0) {
            //console.log(playerX.showName());
            return playerX;
        } else {
            //console.log(playerO.showName());
            return playerO;
        }
    };

    function events() {
        let selectedSpace = document.querySelectorAll('.space');
    
        for(let i = 0; i < selectedSpace.length; i++){
            selectedSpace[i].addEventListener("click", (e) => {
                let space = e.target.id.toString().slice(6);
                if(gameBoard.board[space].content === '') {
                    gameBoard.board[space].content = whosTurn(thisRound).move();
                    gameBoard.updateSpace(space);
                    thisRound++;
                }
            });
        };
    };

    /*
    spaces to win:
    0 1 2
    3 4 5
    6 7 8
    0 4 8
    2 4 6
    0 3 6
    1 4 7
    2 5 8
    */

    return {thisRound, whosTurn, events};
})();

gameBoard.draw();
game.events();