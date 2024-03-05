document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("spirographCanvas");
    const ctx = canvas.getContext("2d");

    const radius1Input = document.getElementById("radius1");
    const radius2Input = document.getElementById("radius2");
    const speed1Input = document.getElementById("speed1");
    const speed2Input = document.getElementById("speed2");
    const colorInput = document.getElementById("color");
    const backgroundInput = document.getElementById("background");
    const rotationDirectionInput = document.getElementById("rotationDirection");
    const numRotationsInput = document.getElementById("numRotations");
    const animationSpeedInput = document.getElementById("animationSpeed");
    const lineStyleInput = document.getElementById("lineStyle");
    const resetButton = document.getElementById("resetButton");

    let radius1 = parseInt(radius1Input.value);
    let radius2 = parseInt(radius2Input.value);
    let speed1 = parseFloat(speed1Input.value);
    let speed2 = parseFloat(speed2Input.value);
    let color = colorInput.value;
    let background = backgroundInput.value;
    let rotationDirection = rotationDirectionInput.value;
    let numRotations = parseInt(numRotationsInput.value);
    let animationSpeed = parseInt(animationSpeedInput.value);
    let lineStyle = lineStyleInput.value;

    let animationId = null;
    let currentRotation = 0;

    radius1Input.addEventListener("input", updateValues);
    radius2Input.addEventListener("input", updateValues);
    speed1Input.addEventListener("input", updateValues);
    speed2Input.addEventListener("input", updateValues);
    colorInput.addEventListener("input", updateValues);
    backgroundInput.addEventListener("input", updateValues);
    rotationDirectionInput.addEventListener("change", updateValues);
    numRotationsInput.addEventListener("input", updateValues);
    animationSpeedInput.addEventListener("input", updateValues);
    lineStyleInput.addEventListener("change", updateValues);
    resetButton.addEventListener("click", resetValues);

    function updateValues() {
        stopAnimation();
        radius1 = parseInt(radius1Input.value);
        radius2 = parseInt(radius2Input.value);
        speed1 = parseFloat(speed1Input.value);
        speed2 = parseFloat(speed2Input.value);
        color = colorInput.value;
        background = backgroundInput.value;
        rotationDirection = rotationDirectionInput.value;
        numRotations = parseInt(numRotationsInput.value);
        animationSpeed = parseInt(animationSpeedInput.value);
        lineStyle = lineStyleInput.value;
        drawSpirograph();
    }

    function resetValues() {
        stopAnimation();
        radius1Input.value = 100;
        radius2Input.value = 150;
        speed1Input.value = 1;
        speed2Input.value = 0.5;
        colorInput.value = "#000000";
        backgroundInput.value = "#ffffff";
        rotationDirectionInput.value = "clockwise";
        numRotationsInput.value = 1;
        animationSpeedInput.value = 10;
        lineStyleInput.value = "solid";
        updateValues();
    }

    function drawSpirograph() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        let angle = 0;
        const increment = 0.01;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.beginPath();
        while (angle < Math.PI * 2 * numRotations) {
            let x = centerX + (radius1 + radius2) * Math.cos(angle) - radius2 * Math.cos((radius1 / radius2 + 1) * angle);
            let y = centerY + (radius1 + radius2) * Math.sin(angle) - radius2 * Math.sin((radius1 / radius2 + 1) * angle);

            if (rotationDirection === "counterclockwise") {
                angle += increment * speed1 * speed2;
            } else {
                angle -= increment * speed1 * speed2;
            }

            ctx.lineTo(x, y);
            angle += increment;
        }

        switch (lineStyle) {
            case "dotted":
                ctx.setLineDash([2, 2]);
                break;
            case "dashed":
                ctx.setLineDash([5, 5]);
                break;
            default:
                ctx.setLineDash([]);
                break;
        }

        ctx.stroke();

        if (animationSpeed > 0) {
            startAnimation();
        }
    }

    function startAnimation() {
        stopAnimation();
        animationId = requestAnimationFrame(animate);
    }

    function stopAnimation() {
        cancelAnimationFrame(animationId);
    }

    function animate() {
        currentRotation += animationSpeed / 100;
        drawSpirograph();
        animationId = requestAnimationFrame(animate);
    }

    drawSpirograph();
});
