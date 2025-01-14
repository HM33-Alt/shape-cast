// Access the canvas element and its 2D context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initialize the default shape type and an array to store shapes
let currentShapeType = "circle"; // Default shape is a circle
let drawnShapes = []; // Array to store all the shapes that get drawn on the canvas

// Add event listeners to the shape buttons
document.getElementById("circleBtn").addEventListener("click", () => {
    currentShapeType = "circle"; // Set the shape type to circle
});
document.getElementById("squareBtn").addEventListener("click", () => {
    currentShapeType = "square"; // Set the shape type to square
});
document.getElementById("triangleBtn").addEventListener("click", () => {
    currentShapeType = "triangle"; // Set the shape type to triangle
});

// Handle canvas clicks to draw the selected shape at the click location
canvas.addEventListener("click", (event) => {
    const mouseX = event.offsetX; // Get the mouse X position
    const mouseY = event.offsetY; // Get the mouse Y position
    const newShape = createShape(mouseX, mouseY); // Create a new shape at the click position
    drawnShapes.push(newShape); // Store the shape in the drawnShapes array

    renderShapes(); // Re-render all shapes to display them on the canvas
});

// Function to create a shape with a random size based on the current shape type
function createShape(x, y) {
    const size = Math.floor(Math.random() * 30) + 20; // Random size between 20 and 50
    return { type: currentShapeType, x, y, size }; // Return the shape object
}

// Function to render all shapes stored in the drawnShapes array
function renderShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before re-rendering

    // Loop through each shape and draw it on the canvas
    drawnShapes.forEach(shape => {
        if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2); // Draw a circle
            ctx.fillStyle = "red"; // Set the color to red
            ctx.fill();
        } else if (shape.type === "square") {
            ctx.fillStyle = "green"; // Set the color to green
            ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size); // Draw a square
        } else if (shape.type === "triangle") {
            ctx.beginPath();
            ctx.moveTo(shape.x, shape.y - shape.size / 2); // Top point of the triangle
            ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2); // Left point
            ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2); // Right point
            ctx.closePath();
            ctx.fillStyle = "blue"; // Set the color to blue
            ctx.fill(); // Fill the triangle
        }
    });
}
