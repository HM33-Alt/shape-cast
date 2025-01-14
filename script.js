// Constants
const SHAPES = {
    CIRCLE: 'circle',
    SQUARE: 'square',
    TRIANGLE: 'triangle',
    DIAMOND: 'diamond'
};

const GAME_CONFIG = {
    SHAPE_POINTS: {
        [SHAPES.CIRCLE]: 5,
        [SHAPES.SQUARE]: 10,
        [SHAPES.TRIANGLE]: 15,
        [SHAPES.DIAMOND]: -1
    },
    TIME_LIMIT: 40,
    MIN_TARGET_SCORE: 50,
    MAX_TARGET_SCORE: 200,
    MIN_SIZE: 20,
    MAX_SIZE: 50
};

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

// Function to handle clearing
function clearSpace() {
    if (!GAME_STATE.isPlaying) {
        showMessage("Start the game first!");
        return;
    }

    // Clear all shapes
    drawnShapes = [];

    // Reset score and time to initial values
    GAME_STATE.currentScore = 0;
    GAME_STATE.timeLeft = GAME_CONFIG.TIME_LIMIT;
    GAME_STATE.targetScore = generateTargetScore();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update UI
    updateUI();

    // Clear any existing timers
    if (window.gameTimer) {
        clearInterval(window.gameTimer);
    }

    // Start a fresh timer
    startTimer();

    showMessage("Space cleared! New target score generated!");
}

document.getElementById("clearBtn").addEventListener("click", clearSpace);

// Game functions
function startGame() {
    // Initialize game state
    GAME_STATE.isPlaying = true;
    GAME_STATE.currentScore = 0;
    GAME_STATE.timeLeft = GAME_CONFIG.TIME_LIMIT;
    GAME_STATE.targetScore = generateTargetScore();

    // Clear any existing shapes and canvas
    drawnShapes = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Enable buttons
    document.getElementById("clearBtn").disabled = false;

    // Start timer
    startTimer();

    // Update UI
    updateUI();

    showMessage("Game started! Reach the target score!");
}

function generateTargetScore() {
    return Math.floor(Math.random() *
            (GAME_CONFIG.MAX_TARGET_SCORE - GAME_CONFIG.MIN_TARGET_SCORE + 1)) +
        GAME_CONFIG.MIN_TARGET_SCORE;
}

// Update startTimer function to store timer reference
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
            clearInterval(window.gameTimer);
            endGame('Time is up!');
        }
    }, 1000);
}

function handleCanvasClick(event) {
    if (!GAME_STATE.isPlaying) return;

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
        GAME_STATE.isPlaying = false;  // Stop the game
        if (window.gameTimer) {
            clearInterval(window.gameTimer);
        }
        const timeLeft = GAME_STATE.timeLeft;
        endGame(`Perfect Score! You won with ${timeLeft} seconds left!`);
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

function updateUI() {
    document.getElementById('scoreDisplay').textContent = `Score: ${GAME_STATE.currentScore}`;
    document.getElementById('targetDisplay').textContent = `Target: ${GAME_STATE.targetScore}`;
    document.getElementById('timeDisplay').textContent = `Time: ${GAME_STATE.timeLeft}s`;
}

function showMessage(text) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.style.opacity = '1';
    setTimeout(() => {
        messageElement.style.opacity = '0';
    }, 2000);
}

function clearSpace() {
    if (!GAME_STATE.isPlaying) {
        showMessage("Start the game first!");
        return;
    }

    // Clear all shapes
    drawnShapes = [];

    // Reset only the current score
    GAME_STATE.currentScore = 0;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update UI
    updateUI();

    showMessage("Space cleared!");
}

// Event Listeners
document.getElementById("startBtn").addEventListener("click", startGame);

Object.values(SHAPES).forEach(shape => {
    const button = document.getElementById(`${shape}Btn`);
    if (button) {
        button.addEventListener('click', () => {
            currentShapeType = shape;
        });
    }
});

canvas.addEventListener("click", handleCanvasClick);

// Error handling for canvas context
if (!ctx) {
    console.error('Canvas context not supported');
    throw new Error('Canvas context not supported');
}