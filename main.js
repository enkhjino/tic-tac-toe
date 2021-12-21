const COLORS = {
    '0': '',
    '1': 'X',
    '-1': 'O'
};


let grid;  // array of column arrays / elements will hold 1/-1 for the players or 0 -> empty
let turn;   // 1 or -1
let winner; // null -> game in progress; 1/-1 a player has won; 'T' -> Tie

const btnEl = document.querySelector('button');
const txtEl = document.querySelector('h1');
const gridEls = [...document.querySelectorAll('#grid > div')];

btnEl.addEventListener('click', init);

document.querySelector('#grid').addEventListener('click', handleMove);

init();

function init() {
    grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    turn = 1;
    winner = null;
    render();
}

function handleMove(evt) {
    // Determine the index of the col clicked
    const colIdx = gridEls.indexOf(evt.target);
    // User miss clicked the section, not a marker
    if (colIdx === -1 || winner) return;
    // Grab the column array
    const colArr = grid[colIdx];
    // Find the first 0 in the colArr
    //const rowIdx = colArr.indexOf(0);

    const colID = Number(evt.target.getAttribute('id')[1]);

    const rowID = Number(evt.target.getAttribute('id')[3]);

    // Update the grid with who made the turn
    grid[colID][rowID] = turn;

    //console.log(grid[colIdx])
    //console.log(colArr + " " + rowIdx)
    //console.log(colArr[rowIdx] + " hehe")
    // Update the turn
    turn *= -1;
    // Update the winner
    winner = getWinner(colID, rowID);
    render();
}

function render() {
    // ternary expression -> <expression> ? <truthy val> : <falsy val>;
    btnEl.style.visibility = winner ? 'visible' : 'hidden';
    rendergrid();
    renderMessage();

}

function renderMessage() {
    if (winner === 'T') {
        txtEl.innerHTML = "It's a Tie!!!";
    } else if (winner) {
        txtEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`;
    } else {
        txtEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`;
    }
}

function rendergrid() {
    grid.forEach(function (colArr, colIdx) {

        colArr.forEach(function (playerVal, rowIdx) {
            const divId = `c${colIdx}r${rowIdx}`;  // e.g. "c6r5"
            const divEl = document.getElementById(divId);
            divEl.innerText = COLORS[playerVal];
        })
    })
}

function getWinner(colIdx, rowIdx) {
    const winner = checkVertWin(colIdx, rowIdx) || checkHorzWin(colIdx, rowIdx) || checkDiagWin(colIdx, rowIdx);
    // TODO: Check for tie
    return winner;
}

function checkVertWin(colIdx, rowIdx) {
    const player = grid[colIdx][rowIdx];  // 1 or -1
    let count = 1;
    rowIdx--;
    while (rowIdx >= 0 && grid[colIdx][rowIdx] === player) {
        count++;
        rowIdx--;
    }
    //console.log(grid);
    return count === 3 ? player : null;
}

function checkHorzWin(colIdx, rowIdx) {
    const player = grid[colIdx][rowIdx];  // 1 or -1
    let count = 1;
    // Count to the left
    let col = colIdx - 1;
    while (col >= 0 && grid[col][rowIdx] === player) {
        count++;
        col--;
    }
    // Count to the right
    col = colIdx + 1
    //console.log(col)
    while (col < grid.length && grid[col][rowIdx] === player) {
        count++;
        col++;
    }
    console.log(count)
    return count >= 3 ? player : null;
}
function checkDiagWin(colIdx, rowIdx) {
    const player = grid[colIdx][rowIdx];  // 1 or -1
    let count = 1;
    // Count to top left
    let col = colIdx - 1
    let row = rowIdx - 1
    while (col >= 0 && row >= 0 && grid[col][rowIdx] === player) {
        count++;
        col--;
        row--
    }
    console.log(col, row)
    return count >= 3 ? player : null;
}