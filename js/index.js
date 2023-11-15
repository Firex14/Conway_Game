const canvas = document.getElementById('gamefield');
const ctx = canvas.getContext('2d');
const rows = 50;
const cols = 120;
const squareCell = 10;
let grid;
let intervalId;


//Fonction de la creation de la grille
function initGrid() {
    const randomGrid = [];
    for (let i = 0; i < rows; i++) {
        randomGrid[i] = [];
        for (let j = 0; j < cols; j++) {
            randomGrid[i][j] = Math.random() > 0.8 ? 1 : 0; 
        }
    }
    return randomGrid;
}

function createEmptyGrid() {
    const resetGrid = [];
    for (let i = 0; i < rows; i++) {
        resetGrid[i] = Array(cols).fill(0);
    }
    return resetGrid;
}


//fonction pour mettre à jour la grille en fonction des voisins
function updateGrid() {
    const updatedGrid = [];
    
    for (let i = 0; i < rows; i++) {
        updatedGrid[i] = [];

        for (let j = 0; j < cols; j++) {

            const total_neighbors = countTotalAliveNeighbors(i, j);

            //si la cellule est vivante
            if (grid[i][j] === 1) {

                // si elle a moins de deux voisins vivants ou plus de trois voisins vivants
                if (total_neighbors < 2 || total_neighbors > 3) {
                    updatedGrid[i][j] = 0;
                } else {
                    updatedGrid[i][j] = 1;
                }
            } else 
                {
                    if (total_neighbors === 3) {
                        updatedGrid[i][j] = 1;
                    }
                    else {
                    updatedGrid[i][j] = 0;
                }
            }
        }
    }
    grid = updatedGrid;
}

//comptage des voisins vivants qui va nous permettre de mettre à jour le jeu
function countTotalAliveNeighbors(row, col) {
    let total_neighbors = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const next_row = row + i;
            const next_col = col + j;
            if (next_row >= 0 && next_row < rows && next_col >= 0 && next_col < cols) {
                total_neighbors += grid[next_row][next_col];
            }
        }
    }
    return total_neighbors;
}

function designGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            ctx.fillStyle = grid[i][j] === 1 ? '#000' : '#fff';
            ctx.fillRect(j * squareCell, i * squareCell, squareCell, squareCell);
            ctx.strokeRect(j * squareCell, i * squareCell, squareCell, squareCell);
        }
    }
}

function startGame() {
    intervalId = setInterval(() => {
        updateGrid();
        designGrid();
    }, 200);
}

function stopGame() {
    clearInterval(intervalId);
}

function restartGame() {
    grid = initGrid();
    console.log(grid);
    designGrid();
}

document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('restart').addEventListener('click', restartGame);


// Initialisation du jeu
grid = initGrid();
designGrid();
