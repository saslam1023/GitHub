document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("spirographCanvas");
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dotRadius = 3;
    let angle = 0;
    let animationId = null;

    document.getElementById("startButton").addEventListener("click", startAnimation);

    function startAnimation() {
        stopAnimation();
        animationId = requestAnimationFrame(animate);
    }

    function stopAnimation() {
        cancelAnimationFrame(animationId);
    }

    function animate() {
        clearCanvas();
        drawDot();
        drawSpirograph();
        angle += 0.01; // Adjust speed as necessary
        animationId = requestAnimationFrame(animate);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawDot() {
        const x = centerX + 100 * Math.cos(angle); // Modify radius as necessary
        const y = centerY + 100 * Math.sin(angle); // Modify radius as necessary
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff0000"; // Red color for dot
        ctx.fill();
    }

    function drawSpirograph() {
        // Inner radius color
        ctx.strokeStyle = "#FF5733"; // Example color for inner radius
        ctx.lineWidth = 2;
        ctx.beginPath();
        // Example inner radius path
        ctx.moveTo(centerX + 50 * Math.cos(angle), centerY + 50 * Math.sin(angle));
        ctx.lineTo(centerX + 100 * Math.cos(angle * 2), centerY + 100 * Math.sin(angle * 2));
        ctx.stroke();

        // Outer radius color
        ctx.strokeStyle = "#33FF57"; // Example color for outer radius
        ctx.beginPath();
        // Example outer radius path
        ctx.moveTo(centerX + 100 * Math.cos(angle), centerY + 100 * Math.sin(angle));
        ctx.lineTo(centerX + 150 * Math.cos(angle * 2), centerY + 150 * Math.sin(angle * 2));
        ctx.stroke();
    }

    function drawRadii() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw inner radius circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, parseInt(radius1Input.value), 0, Math.PI * 2);
        ctx.strokeStyle = 'blue'; // Color for inner radius
        ctx.stroke();

        // Draw outer radius circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, parseInt(radius2Input.value), 0, Math.PI * 2);
        ctx.strokeStyle = 'green'; // Color for outer radius
        ctx.stroke();
    }

    // Call the drawRadii function initially to draw the circles
    drawRadii();


});
