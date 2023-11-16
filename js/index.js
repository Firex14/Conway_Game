const canvas = document.getElementById('gamefield');
const gameMessageElement = document.getElementById('end-game');
const context = canvas.getContext('2d');
const rows = 50;
const cols = 90;
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

//Fonction qui permet de rendre toutes les cellules mortes
function resetGrid() {
    const resetedGrid = [];
    for (let i = 0; i < rows; i++) {
        resetedGrid[i] = Array(cols).fill(0);
    }
    return resetedGrid;
}


//fonction pour mettre à jour la grille en fonction des voisins
function updateGrid() {
    const updatedGrid = [];
    let allCellsDead = true;
    
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
                    allCellsDead = false;
                }
            } else 
                {
                    if (total_neighbors === 3) {
                        updatedGrid[i][j] = 1;
                        allCellsDead = false;

                    }
                    else {
                    updatedGrid[i][j] = 0;
                }
            }
        }
    }
 
    if (allCellsDead) {
        gameMessageElement.innerText = 'Le jeu est terminé.';
        stopGame();
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

//la fonction qui dessine les cellules
function designGrid() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            context.fillStyle = grid[i][j] === 1 ? '#fa0' : '#000';
            context.strokeStyle = '#fa0';
            context.fillRect(j * squareCell, i * squareCell, squareCell, squareCell);
            context.strokeRect(j * squareCell, i * squareCell, squareCell, squareCell);
        }
    }
}




function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const choosedCol = Math.floor(x / squareCell);
    const choosedRow = Math.floor(y / squareCell);

    // Inversez l'état de la cellule (0 devient 1 et vice versa)
    grid[choosedRow][choosedCol] = 1 - grid[choosedRow][choosedCol];

    designGrid(); // Redessinez la grille après le changement
}


function startGame() {
    gameMessageElement.innerText = '';
    intervalId = setInterval(() => {
        updateGrid();
        designGrid();
    }, 100);
}

function stopGame() {
    clearInterval(intervalId);
}

function restartGame() {
    gameMessageElement.innerText = '';
    grid = initGrid();
    console.log(grid);
    designGrid();
}

function resetGame() {
    grid = resetGrid();
    designGrid();
}

canvas.addEventListener('mousedown', handleCanvasClick);
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('restart').addEventListener('click', restartGame);
document.getElementById('reset').addEventListener('click', resetGame);



// Initialisation du jeu
grid = initGrid();
designGrid();
