const gameBoard = (() => {
    const space = {
        content: '',
        isEmpty: function() {
            if(space.content === '') {
                return true;
            } else {
                return false;
            }
        }
    };

    const board = [];
    const BOARDSIZE = 9;

    const draw = () => {
        for(let i = 0; i < BOARDSIZE; i++) {
            board.push(space);
            renderSpace(i);
        }
    };

    const renderSpace = (number) => {
        let singleSpace = document.createElement('div');
        singleSpace.setAttribute('id', `space-${number}`);
        singleSpace.classList.add('space');
        document.querySelector('.gameboard').appendChild(singleSpace);
    };

    return {draw, board};
})();