# Shape-Cast

## Description
This is my project submission for the AWS Game Builder Challenge (https://awsdevchallenge.devpost.com/).\
To view my submission: https://main.d1tlgag3vgp7ls.amplifyapp.com/ (web application)

## Purpose For The Developer
Provided an opportunity for me to explore and familiarize myself with AWS technologies, described in the below sections.

## Intended Purpose Of The Game
Shape-Cast is an interactive browser-based game where players strategically select and place different shapes on a blank canvas to achieve the target score within a time limit.\
The game combines quick thinking with score optimization and seeks to challenge players to use various shapes (each with different points) to reach the goal.

## Technical Implementation
This project was developed using:
- HTML5 Canvas for game rendering
- Vanilla JavaScript for game logic
- CSS for styling and responsive design
- Amazon Q Developer for game development
- AWS Amplify for web hosting

### How I Used Amazon Q Developer 
Amazon Q Developer was instrumental in the development process:
- Code Generation: Used to generate the initial HTML structure and game canvas setup
- Best Practices: Provided guidance on game implementation and structure
- Good SWE Principles: Ensured that poor code practices were avoided as much as possible (i.e. depth of arrowhead code, nested loops, poor code commit language)
- Code Review: Utilized the inbuilt '/review' to identify and fix potential issues in the implementation

### How I Used Other AWS Services
- I used AWS Amplify to deploy the game as a web application: https://main.d1tlgag3vgp7ls.amplifyapp.com/ 

## Features
- Real-time score tracking and countdown
- Multiple shape options with different point values:
    - Circle (5 points)
    - Square (10 points)
    - Triangle (15 points)
    - Diamond (-1 point)
- 40-second time limit per round
- Interactive canvas-based gameplay
- Clear space functionality
- Collapsible in-game guide displayed as a left sidebar

Below is a screenshot of the game screen:
![Game Screen](images/Ui.png)

## Functionalities
- Timer implementation
````
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
````

- Canvas rendering
````
function renderShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawnShapes.forEach(shape => {
        const drawFunction = drawingFunctions[shape.type];
        if (drawFunction) {
            drawFunction(shape);
        }
    });
}
````
- Score calculation logic
````
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
````
- DOM manipulation for the sidebar
````
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
````

## Game Rules (Also Available In-Game)
1. Game Objective: Reach the target score within the time limit by strategically placing shapes.

2. Shape Values:
   Circle: 5 points
   Square: 10 points
   Triangle: 15 points
   Diamond: -1 point

3. Controls:
   - Press 'Start Game' to begin a new game 
   - Click any shape button to select it</li>
   - Click on the canvas to place the selected shape</li>
   - Once you have selected a shape, you do not need to click the same shape button again unless you would like to change the shape.</li>
   - In other words, you can select a shape once and place it on the canvas as many times as you can and as fast as you can until you need to change the shape.</li>
   - Use 'Clear Space' to remove all shapes</li>
   - Press 'Start Game' to begin a new game or restart if its too hard</li>

4. Tips
   - Plan your shape placements carefully
   - Watch the timer
   - Use diamonds strategically to adjust your score</li>

## License
MIT