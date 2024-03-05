document.addEventListener("DOMContentLoaded", function () {
    const outerCircle = document.getElementById('outerCircle');
    const innerCircle = document.getElementById('innerCircle');
    const penPosition = document.getElementById('penPosition');
    const animateButton = document.getElementById('animateButton');
    const stopAnimateButton = document.getElementById('stopAnimateButton');


    let outerCircleRect = outerCircle.getBoundingClientRect();
    let innerCircleRect = innerCircle.getBoundingClientRect();
    let penPositionRect = penPosition.getBoundingClientRect();

    let outerCircleRadius = outerCircleRect.width / 2;
    let innerCircleRadius = innerCircleRect.width / 2;

    let icValue = 5;
    let icPPValue = 5;
    let icPosValue = 4;
    let ppXValue = 5;
    let ppYValue = 5;

    function updateInnerCirclePosition() {
        let maxDistance = outerCircleRadius - innerCircleRadius;
        let icX = outerCircleRect.left + outerCircleRadius - innerCircleRadius + maxDistance * Math.cos((icPosValue / 8) * 2 * Math.PI);
        let icY = outerCircleRect.top + outerCircleRadius - innerCircleRadius + maxDistance * Math.sin((icPosValue / 8) * 2 * Math.PI);

        innerCircle.style.left = icX + 'px';
        innerCircle.style.top = icY + 'px';

        updatePenPosition();
    }

    function updatePenPosition() {
        let penX = parseFloat(innerCircle.style.left) + innerCircleRadius - penPositionRect.width / 2 + (ppXValue - 5);
        let penY = parseFloat(innerCircle.style.top) + innerCircleRadius - penPositionRect.height / 2 + (ppYValue - 5);

        penPosition.style.left = penX + 'px';
        penPosition.style.top = penY + 'px';
    }

    updateInnerCirclePosition();

    const icSlider = document.getElementById('icSlider');
    const icPPSlider = document.getElementById('icPPSlider');
    const icPosSlider = document.getElementById('icPosSlider');
    const ppXSlider = document.getElementById('ppXSlider');
    const ppYSlider = document.getElementById('ppYSlider');

    icSlider.addEventListener('input', function () {
        icValue = icSlider.value;
        updateInnerCirclePosition();
    });

    icPPSlider.addEventListener('input', function () {
        icPPValue = icPPSlider.value;
        updatePenPosition();
    });

    icPosSlider.addEventListener('input', function () {
        icPosValue = icPosSlider.value;
        updateInnerCirclePosition();
    });

    ppXSlider.addEventListener('input', function () {
        ppXValue = ppXSlider.value;
        updatePenPosition();
    });

    ppYSlider.addEventListener('input', function () {
        ppYValue = ppYSlider.value;
        updatePenPosition();
    });

    function animate() {
        let angle = 0;
        let centerX = outerCircleRect.left + outerCircleRadius;
        let centerY = outerCircleRect.top + outerCircleRadius;
        let radius = outerCircleRadius - innerCircleRadius;
        let pathCoordinates = []; // Array to store coordinates for tracing path

        let interval = setInterval(function () {
            let x = centerX + radius * Math.cos(angle);
            let y = centerY + radius * Math.sin(angle);

            // Move the pen position
            penPosition.style.left = x - penPositionRect.width / 2 + 'px';
            penPosition.style.top = y - penPositionRect.height / 2 + 'px';

            // Move the inner circle along with the pen position
            innerCircle.style.left = x - innerCircleRadius + 'px';
            innerCircle.style.top = y - innerCircleRadius + 'px';

            angle += 0.02;

            // Store coordinates for tracing path
            pathCoordinates.push({ x: parseFloat(penPosition.style.left) + penPositionRect.width / 2, y: parseFloat(penPosition.style.top) + penPositionRect.height / 2 });

            // Draw path using the stored coordinates
            drawPath(pathCoordinates);

            if (angle >= Math.PI * 2) {
                clearInterval(interval);
                // Reset the position of the pen
                penPosition.style.left = parseFloat(innerCircle.style.left) + innerCircleRadius - penPositionRect.width / 2 + (ppXValue - 5) + 'px';
                penPosition.style.top = parseFloat(innerCircle.style.top) + innerCircleRadius - penPositionRect.height / 2 + (ppYValue - 5) + 'px';
            }
        }, 10);
    }

    function drawPath(coordinates) {
        const canvas = document.getElementById('traceCanvas');
        const ctx = canvas.getContext('2d');

        // Clear the previous path
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Begin drawing the path
        ctx.beginPath();
        ctx.moveTo(coordinates[0].x, coordinates[0].y);

        for (let i = 1; i < coordinates.length; i++) {
            ctx.lineTo(coordinates[i].x, coordinates[i].y);
        }

        // Set style and stroke the path
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    animateButton.addEventListener('click', function () {
        animate();
    });


});

function stopAnimation() {
    clearInterval(animationInterval);
}