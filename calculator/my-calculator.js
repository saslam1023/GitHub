// Get the form element
const calculatorForm = document.getElementById('calculatorForm');

// Add submit event listener to the form
calculatorForm.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
});

// Get form calculator query
let result = document.getElementById('result');

let resultValue = result.value;

// Tracker
let queryTracker = false; // no query/ empty



// Using keyboard
document.addEventListener('keydown', function (event) {

  // Check if query content
  if (queryTracker === true) {
    clearQuery();
  }
  // If query content empty
  else if (queryTracker === false) {

    // Check if the pressed key is a number (0-9)
    if (event.key >= '0' && event.key <= '9' || event.key == '+' || event.key == '-' || event.key == '/' || event.key == '*' || event.key == '=') {

      // Call the function to append the pressed key to the result input
      appendToResult(event.key);
    }
    else if (event.key == 'Enter') {
      queryTracker = true;
      calculate();
    }
  }
});

function appendToResult(value) {
  // Append the value to the current value in the result input
  result.value += value;

}


//  Calculates the query 
function calculate() {
  // Get the current value of the result input
  let current_Result = result.value;

  // Calculate the answer
  let answer = math.evaluate(current_Result);

  // Display the answer
  result.value = answer;

}

// Get all number buttons
let numberButtons = document.querySelectorAll('.button');

// Add click event listeners to all number buttons
numberButtons.forEach(function (button) {
  // Checks if query has previous content, then clears it if true
  if (queryTracker === true) {
    clearQuery();
  }
  button.addEventListener('click', function () {

    // Get the value of the clicked button
    let buttonValue = button.value;

    // Get the current value of the result input
    let currentResult = result.value;

    // Add the button value to the current result value
    result.value = currentResult + buttonValue;
    queryTracker = true;

  });
});


// RESET Clears the query screen
function clearQuery() {
  result.value = '';
  queryTracker = false;
}