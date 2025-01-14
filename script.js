// Constants (Shapes)
const SHAPES = {
    CIRCLE: 'circle',
    SQUARE: 'square',
    TRIANGLE: 'triangle',
    DIAMOND: 'diamond'
};

// Shapes points allocation
const GAME_CONFIG = {
    SHAPE_POINTS: {
        [SHAPES.CIRCLE]: 5,
        [SHAPES.SQUARE]: 10,
        [SHAPES.TRIANGLE]: 15,
        [SHAPES.DIAMOND]: -1
    },

    // Setting time limits and possible target scores
    TIME_LIMIT: 40,
    MIN_TARGET_SCORE: 50,
    MAX_TARGET_SCORE: 200,
    MIN_SIZE: 20,
    MAX_SIZE: 50
};

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Error handling for canvas
if (!ctx) {
    console.error('Canvas context not supported');
    throw new Error('Canvas context not supported');
}

// Game State
const GAME_STATE = {
    currentScore: 0,
    targetScore: 0,
    timeLeft: 0,
    isPlaying: false
};

// State management
let currentShapeType = SHAPES.CIRCLE;
let drawnShapes = [];

// Drawing functions
const drawingFunctions = {
    [SHAPES.CIRCLE]: (shape) => {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
    },
    [SHAPES.SQUARE]: (shape) => {
        ctx.fillStyle = "green";
        ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    },
    [SHAPES.TRIANGLE]: (shape) => {
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y - shape.size / 2);
        ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
        ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
        ctx.closePath();
        ctx.fillStyle = "blue";
        ctx.fill();
    },
    [SHAPES.DIAMOND]: (shape) => {
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y - shape.size / 2); // top
        ctx.lineTo(shape.x + shape.size / 2, shape.y); // right
        ctx.lineTo(shape.x, shape.y + shape.size / 2); // bottom
        ctx.lineTo(shape.x - shape.size / 2, shape.y); // left
        ctx.closePath();
        ctx.fillStyle = "purple";
        ctx.fill();
    }
};

// Game functions
function startGame() {
    // Reset the game state
    GAME_STATE.isPlaying = true;
    GAME_STATE.currentScore = 0;
    GAME_STATE.timeLeft = GAME_CONFIG.TIME_LIMIT;
    GAME_STATE.targetScore = generateTargetScore();

    // Clear any existing drawn shapes
    drawnShapes = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Re-enable canvas interaction
    document.getElementById("gameCanvas").style.pointerEvents = "auto";  // Re-enable mouse events

    // Enable buttons (if previously disabled)
    document.getElementById("clearBtn").disabled = false;

    // Start the timer
    startTimer();

    // Update the UI
    updateUI();

    // Show message that the game has started
    showMessage("Game started! Reach the target score!");
}

function generateTargetScore() {
    return Math.floor(Math.random() *
            (GAME_CONFIG.MAX_TARGET_SCORE - GAME_CONFIG.MIN_TARGET_SCORE + 1)) +
        GAME_CONFIG.MIN_TARGET_SCORE;
}

// Timer functions
function startTimer() {
    // Clear any existing timer
    if (window.gameTimer) {
        clearInterval(window.gameTimer);
    }

    window.gameTimer = setInterval(() => {
        if (GAME_STATE.timeLeft > 0) {
            GAME_STATE.timeLeft--;
            updateUI();
        } else {
            clearInterval(window.gameTimer);  // Stop timer
            endGame('Time is up!');  // Call the end game function
        }
    }, 1000);
}

// End game management
function endGame(message) {
    GAME_STATE.isPlaying = false;
    clearInterval(window.gameTimer);  // Stop the timer

    // Show message to indicate that the game is over
    showMessage(message);

    // Disable canvas interaction
    document.getElementById("gameCanvas").style.pointerEvents = "none";  // Disable mouse events on canvas
}

// Checking user interactions
function handleCanvasClick(event) {
    if (!GAME_STATE.isPlaying) {  // Check if the game is still active
        showMessage("Game Over! Start a new game to play.");
        return;  // Prevent shape placement when the game is not active
    }

    const { offsetX: mouseX, offsetY: mouseY } = event;
    const newShape = createShape(mouseX, mouseY);
    const pointsToAdd = GAME_CONFIG.SHAPE_POINTS[currentShapeType];

    // Check if adding this shape would make score negative
    if (GAME_STATE.currentScore + pointsToAdd < 0) {
        showMessage("Score cannot go below zero!");
        return;
    }

    // For diamond (-1), don't check if exceeding target
    if (currentShapeType !== SHAPES.DIAMOND) {
        if (GAME_STATE.currentScore + pointsToAdd > GAME_STATE.targetScore) {
            showMessage("That would exceed the target score! Try using a diamond (-1)!");
            return;
        }
    }

    // Add shape and update score
    drawnShapes.push(newShape);
    GAME_STATE.currentScore += pointsToAdd;

    // Render the new shape
    renderShapes();
    updateUI();

    // Check for win condition after rendering
    if (GAME_STATE.currentScore === GAME_STATE.targetScore) {
        endGame("Score Reached! Hit Start Game To Play Again!");  // End the game when score is reached
    }
}

function createShape(x, y) {
    const size = Math.floor(Math.random() *
        (GAME_CONFIG.MAX_SIZE - GAME_CONFIG.MIN_SIZE)) + GAME_CONFIG.MIN_SIZE;
    return { type: currentShapeType, x, y, size };
}

function renderShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnShapes.forEach(shape => {
        const drawFunction = drawingFunctions[shape.type];
        if (drawFunction) {
            drawFunction(shape);
        }
    });
}

// UI update functions
function updateUI() {
    document.getElementById('scoreDisplay').textContent = `Score: ${GAME_STATE.currentScore}`;
    document.getElementById('targetDisplay').textContent = `Target: ${GAME_STATE.targetScore}`;
    document.getElementById('timeDisplay').textContent = `Time: ${GAME_STATE.timeLeft}s`;
}

function showMessage(message) {
    const messageBox = document.getElementById("message");
    messageBox.textContent = message;
    messageBox.style.opacity = 1;

    setTimeout(() => {
        messageBox.style.opacity = 0;  // Hide the message after a delay
    }, 3000);
}

// Function to handle clearing
function clearSpace() {
    if (!GAME_STATE.isPlaying) {
        showMessage("Start the game first!");
        return;
    }

    // Clear all drawn shapes from the canvas
    drawnShapes = [];

    // Reset the current score to 0
    GAME_STATE.currentScore = 0;

    // Clear the canvas but keep the target score and time left intact
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update UI
    updateUI();

    // Show a message
    showMessage("Canvas cleared and score reset! Play on!.");
}

// Event Listeners
document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("clearBtn").addEventListener("click", clearSpace);

Object.values(SHAPES).forEach(shape => {
    const button = document.getElementById(`${shape}Btn`);
    if (button) {
        button.addEventListener('click', () => {
            currentShapeType = shape;
        });
    }
});
canvas.addEventListener("click", handleCanvasClick);

// Get guide elements
const guidePanel = document.getElementById("guidePanel");
const toggleGuideBtn = document.getElementById("toggleGuideBtn");

// Toggle guide visibility
toggleGuideBtn.onclick = function() {
    guidePanel.classList.toggle("open");
    // Update ARIA attributes
    const isExpanded = guidePanel.classList.contains("open");
    toggleGuideBtn.setAttribute("aria-expanded", isExpanded);
}

// Add keyboard accessibility
document.addEventListener('keydown', function(event) {
    if (event.key === 'g' || event.key === 'G') {
        toggleGuideBtn.click();
    }
});

// Initialize ARIA attributes
toggleGuideBtn.setAttribute("aria-expanded", "false");
toggleGuideBtn.setAttribute("aria-controls", "guidePanel");
guidePanel.setAttribute("aria-label", "Game guide");