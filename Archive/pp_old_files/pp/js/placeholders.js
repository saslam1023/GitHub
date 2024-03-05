

const gridContainer = document.querySelector('#grid');
const targetItemCount = 8;

// Placeholders for full grid style view

// Check the current number of li elements after dynamic data is loaded
const currentItemCount = gridContainer.querySelectorAll('.box').length;

// Calculate the remaining items needed to complete the last row
const remainingItems = targetItemCount - (currentItemCount % targetItemCount);

// Add placeholder li elements only for the last row
if (remainingItems > 0) {
    addPlaceholders(remainingItems);

}

// Placeholder additions
let placeholdersLoaded = false;

// Placeholder additions
function addPlaceholders(remainingItems) {
    // Array of possible colors (yes, pink and white are set twice!)
    const colors = ['pink', 'blue', 'green', 'gold', 'white', 'black', 'pink', 'white'];

    // Array to store the colors used in the current row
    let usedColorsInRow = [];

    for (let i = 0; i < remainingItems; i++) {
        // Filter out colors that have been used in the current row to prevent duplicates
        const availableColors = colors.filter(color => !usedColorsInRow.includes(color));

        // If all unique colors have been used, allow controlled repetition
        if (availableColors.length === 0) {
            // Choose a random color from the entire color array
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            // Add the chosen color to the usedColorsInRow array
            usedColorsInRow.push(randomColor);
        } else {
            // Choose a random color from the available colors
            const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
            // Add the chosen color to the usedColorsInRow array
            usedColorsInRow.push(randomColor);
        }

        // Create placeholder li element with the random color
        const placeholderLi = document.createElement('li');

        // Add additional classes
        placeholderLi.classList.add('box', 'illuminate', 'boxshadow', usedColorsInRow[i], 'round-border');

        // Add text content if desired
        placeholderLi.textContent = '';

        // Update grid
        gridContainer.append(placeholderLi);
    }
    placeholdersLoaded = true;        // Run the search function only if placeholders have been loaded
    if (placeholdersLoaded) {
        initializeSearch();
    }
}
