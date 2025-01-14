// Constants
const SHAPES = {
    CIRCLE: 'circle',
    SQUARE: 'square',
    TRIANGLE: 'triangle'
};

const COLORS = {
    CIRCLE: 'red',
    SQUARE: 'green',
    TRIANGLE: 'blue'
};

const SHAPE_CONFIG = {
    MIN_SIZE: 20,
    MAX_SIZE: 50
};

// Canvas setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// State management
let currentShapeType = SHAPES.CIRCLE;
let drawnShapes = [];

// Error handling for canvas context
if (!ctx) {
    console.error('Canvas context not supported');
    throw new Error('Canvas context not supported');
}

// Shape drawing functions
const drawingFunctions = {
    [SHAPES.CIRCLE]: (shape) => {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.CIRCLE;
        ctx.fill();
    },
    [SHAPES.SQUARE]: (shape) => {
        ctx.fillStyle = COLORS.SQUARE;
        ctx.fillRect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
    },
    [SHAPES.TRIANGLE]: (shape) => {
        ctx.beginPath();
        ctx.moveTo(shape.x, shape.y - shape.size / 2);
        ctx.lineTo(shape.x - shape.size / 2, shape.y + shape.size / 2);
        ctx.lineTo(shape.x + shape.size / 2, shape.y + shape.size / 2);
        ctx.closePath();
        ctx.fillStyle = COLORS.TRIANGLE;
        ctx.fill();
    }
};

// Event handlers
const handleShapeSelection = (shapeType) => {
    currentShapeType = shapeType;
};

const handleCanvasClick = (event) => {
    const { offsetX: mouseX, offsetY: mouseY } = event;
    const newShape = createShape(mouseX, mouseY);
    drawnShapes.push(newShape);
    renderShapes();
};

// Initialize event listeners
const initializeEventListeners = () => {
    Object.values(SHAPES).forEach(shape => {
        const button = document.getElementById(`${shape}Btn`);
        if (button) {
            button.addEventListener('click', () => handleShapeSelection(shape));
        }
    });

    canvas.addEventListener('click', handleCanvasClick);
};

// Shape creation
const createShape = (x, y) => {
    const size = Math.floor(Math.random() *
        (SHAPE_CONFIG.MAX_SIZE - SHAPE_CONFIG.MIN_SIZE)) + SHAPE_CONFIG.MIN_SIZE;
    return { type: currentShapeType, x, y, size };
};

// Rendering
const renderShapes = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawnShapes.forEach(shape => {
        const drawFunction = drawingFunctions[shape.type];
        if (drawFunction) {
            drawFunction(shape);
        }
    });
};

// Initialize the application
const init = () => {
    try {
        initializeEventListeners();
        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
};

// Start the application
init();
