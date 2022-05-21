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

    //draw all spaces from the spaces array
    const draw = () => {
        for(let i = 0; i < BOARDSIZE; i++) {
            board.push(space(''));
            renderSpace(i);
        }
    };

    //helper function to add DOM elements of spaces on the board
    const renderSpace = (number) => {
        let singleSpace = document.createElement('div');
        singleSpace.setAttribute('id', `space-${number}`);
        singleSpace.classList.toggle('space');
        document.querySelector('.gameboard').appendChild(singleSpace);
    };

    const removeHighlight = (number) => {
        document.querySelector(`#space-${number}`).classList.remove('highlight');
    };

    //helper function to update a space when a player marks it
    const updateSpace = (number) => {
        document.querySelector(`#space-${number}`).textContent = board[number].content;
    };

    const board = [];
    const BOARDSIZE = 9;

    return {draw, board, space, updateSpace, removeHighlight};
})();

//player's have a unique move and name
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
    let gameIsOver = false;

    //toggles the turns between both players
    const whosTurn = (currentRound) => {
        if(currentRound % 2 == 0) {
            //console.log(playerX.showName());
            return playerX;
        } else {
            //console.log(playerO.showName());
            return playerO;
        }
    };

    //event helper to keep all DOM event listeners
    function events() {
        let selectedSpace = document.querySelectorAll('.space');
    
        //when a player clicks a space and marks it, the game changes turns if its not over
        for(let i = 0; i < selectedSpace.length; i++){
            selectedSpace[i].addEventListener("click", (e) => {
                let space = e.target.id.toString().slice(6);
                if(gameBoard.board[space].content === '' && gameIsOver === false) {
                    gameBoard.board[space].content = whosTurn(thisRound).move();
                    gameBoard.updateSpace(space);
                    thisRound++;
                    if(thisRound > 5) {
                        checkForWinner();
                    }
                }
            });
        };

        //simple reset of the board and game states
        let resetBoard = document.querySelector('.reset');
        resetBoard.addEventListener("click", (e) => {
            initBoard();
            thisRound = 1;
            gameIsOver = false;
        });
    };

    //refreshes a blank board, for reset
    function initBoard() {
        for(let i = 0; i < gameBoard.board.length; i ++) {
            gameBoard.board[i].content = '';
            gameBoard.updateSpace(i);
            gameBoard.removeHighlight(i);
            document.querySelector('h1').textContent = 'Tic Tac Toe!';
        }
    };
    
    //helper function to find all occupied spaces
    function getAllIndexes(array, value) {
        let indexes = [];
        for(let i = 0; i < array.length; i++) {
            if(array[i].content === value) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    //is only called upon after turn 5 from events()
    function checkForWinner() {
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

        //find a list of all the moves of the current players turn
        let checkedPlayer = whosTurn(thisRound - 1)
        let spacesUsed = getAllIndexes(gameBoard.board, checkedPlayer.move());
        let markedSpaces = 0;
        let winningSpaces = [];
        //all winning combinations of spaces
        let winCondition = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]
        ];

        //no good support for object comparison, so objects were stringified
        let playerMoves = JSON.stringify(spacesUsed);

        //runs through all of the winning combinations and compares is against the markes spaecs, and if there is a match, game over!
        for(let i = 0; i < winCondition.length; i++){
            markedSpaces = 0;
            winningSpaces = [];
            for(let j = 0; j < spacesUsed.length; j++) {
                if(winCondition[i].includes(spacesUsed[j])) {
                    markedSpaces++;
                    winningSpaces.push(spacesUsed[j]);
                    if(markedSpaces == 3) {
                        console.log(`${checkedPlayer.showName()} wins!`);
                        document.querySelector('h1').textContent = `${checkedPlayer.showName()} wins!`;
                        gameIsOver = true;
                        highlightSpaces(winningSpaces);
                    }
                }
            }
        }
    }

    //UI update after winner is found
    function highlightSpaces(array) {
        for(let i = 0; i < array.length; i++) {
            let winningSpace = document.querySelector(`#space-${array[i]}`);
            winningSpace.classList.toggle('highlight');
        }
    };

    return {thisRound, whosTurn, events};
})();

//game start and attaching all events
gameBoard.draw();
game.events();