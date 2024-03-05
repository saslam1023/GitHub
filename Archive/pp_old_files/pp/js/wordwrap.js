// Function to adjust font size to fit text within container
function adjustFontSize() {
    var elements = document.querySelector('h2');
    elements.forEach(function (element) {
        var containerWidth = element.parentElement.offsetWidth;
        var fontSize = 48; // Initial font size
        element.style.fontSize = fontSize + 'px'; // Set initial font size

        // Reduce font size if text overflows container
        while (element.offsetWidth > containerWidth && fontSize > 0) {
            fontSize--;
            element.style.fontSize = fontSize + 'px';
        }
    });
}

// Call adjustFontSize function when the window is resized
window.addEventListener('resize', adjustFontSize);

// Call adjustFontSize function on page load
adjustFontSize();