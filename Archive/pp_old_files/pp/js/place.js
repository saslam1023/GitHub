// Define the dimensions of the grid
const rows = 5;
const cols = 5;

// Define a list of available colors
const colors = ['red', 'blue', 'green', 'yellow', 'purple'];

// Create a grid of boxes with random colors
let grid = [];
for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
        grid[i][j] = getRandomColor();
    }
}

// Ensure that no two adjacent boxes have the same color
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        if (i > 0 && grid[i][j] === grid[i - 1][j]) { // Check above
            grid[i][j] = getRandomColor();
        }
        if (j > 0 && grid[i][j] === grid[i][j - 1]) { // Check left
            grid[i][j] = getRandomColor();
        }
    }
}

// Helper function to get a random color from the colors array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Display the grid
for (let i = 0; i < rows; i++) {
    let rowString = '';
    for (let j = 0; j < cols; j++) {
        rowString += grid[i][j] + ' ';
    }
    console.log(rowString);
}
