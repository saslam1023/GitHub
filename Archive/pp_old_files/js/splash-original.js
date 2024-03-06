document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('splash-container');
    const textcontainer = document.getElementById('pp-text-container');
    const text = document.getElementById('pp-text');
    const numPixelsWidth = Math.floor(window.innerWidth / 10); // Number of pixels horizontally
    const numPixelsHeight = Math.ceil(window.innerHeight / 10); // Number of pixels vertically (rounded up)
    const numPixels = numPixelsWidth * numPixelsHeight;
    const colors = ['#dc14ad', 'black', '#14b4dc', '#f3a70e', '#67dc14', 'black', 'white']; // Remove white from colors

    // Create pixel elements and add them to the container
    for (let i = 0; i < numPixels; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        container.appendChild(pixel);

        // Randomize color for each pixel
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        pixel.style.backgroundColor = randomColor;

        // Set a delay for appearance
        const delay = Math.random() * 10; // Random delay between 0 and 10 seconds
        pixel.style.animationDelay = (delay + 1) + 's'; // Add 3 seconds delay
    }

    // Update grid-template-columns to match the number of pixels horizontally
    container.style.gridTemplateColumns = `repeat(${numPixelsWidth}, 10px)`;
    container.style.gridTemplateRows = `repeat(${numPixelsHeight}, 10px)`;

    // Hide the container and text after 4 seconds (2 seconds after the animation completes)
    setTimeout(function () {
        container.classList.add('ppfadeOut');
        setTimeout(function () {
            container.remove();
            document.querySelector('.pp-text-container').remove();
            //container.style.display = 'none';
            //document.querySelector('.pp-text-container').style.display = 'none';
        }, 4000); // Adjust duration of fade out animation
    }, 4000); // Adjust delay before hiding

    // Add an event listener to dynamically load the data script after animation
    container.addEventListener('animationend', function (event) {
        if (event.target === container) {
            // Call function to load the data script after a delay of 6 seconds
            setTimeout(loadSecondScript, 4000);
        }
    });
});

function loadSecondScript() {
    const script = document.createElement('script');
    script.src = 'js/datax.js'; // Path to your second script file
    document.body.appendChild(script);
}
