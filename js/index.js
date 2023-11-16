const canvas = document.getElementById('gamefield');
const gameMessageElement = document.getElementById('end-game');
const context = canvas.getContext('2d');
const rows = 30;
const cols = 60;
const squareCell = 15;
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

//Fonction qui permet d'initialiser le grille avec le motif du canon à planeur de gosper
function gosperGliderGunGrid() {
    grid = resetGrid();
    const gospergrid = resetGrid();

    const gosperGliderGunCoordinates = [
        [5, 1], [5, 2], [6, 1], [6, 2],
        [3, 13], [3, 14], [4, 12], [5, 11],
        [6, 11], [7, 11], [8, 12], [9, 13],
        [9, 14], [6, 15], [4, 16], [8, 16],
        [5, 17], [6, 17], [7, 17], [6, 18],
        [3, 21], [3, 22], [4, 21], [4, 22],
        [5, 21], [5, 22], [2, 23], [6, 23],
        [1, 25], [2, 25], [6, 25], [7, 25],
        [3, 35], [3, 36], [4, 35], [4, 36],
    ];

    gosperGliderGunCoordinates.forEach(coord => {
        const [row, col] = coord;
        gospergrid[row][col] = 1;
    });

    return gospergrid;
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
            context.fillStyle = grid[i][j] === 1 ? '#003a66' : '#c8e0f3';
            context.strokeStyle = '#000';
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

    grid[choosedRow][choosedCol] = 1 - grid[choosedRow][choosedCol];

    designGrid(); 
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

function gosperGliderGun(){
    grid = gosperGliderGunGrid();
    designGrid();
}
canvas.addEventListener('mousedown', handleCanvasClick);
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('gosperGlider').addEventListener('click', gosperGliderGun);
document.getElementById('restart').addEventListener('click', restartGame);
document.getElementById('reset').addEventListener('click', resetGame);



// Initialisation du jeu
grid = initGrid();
designGrid();
