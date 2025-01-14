# Shape-Cast

## Description
This is my project submission for the AWS Game Builder Challenge (https://awsdevchallenge.devpost.com/).
To view my submission: []

## Purpose Of The Game
Shape-Cast is an interactive browser-based game where players strategically select and place different shapes on a blank canvas
to achieve target scores within a time limit. The game combines quick thinking with score optimization and seeks to challenge players to use various shapes with different point values to reach their goals.

## Technical Implementation
This project was developed using:
- HTML5 Canvas for game rendering
- Vanilla JavaScript for game logic
- CSS for styling and responsive design
- Amazon Q
- 
## Purpose For The Developer
Provided an opportunity for me to explore and familiarize myself with AWS technologies (described below).
Namely, I used Amazon Q Developer to speed up/optimize game development and AWS Amplify to host it as a web application.

### Amazon Q Developer Integration
Amazon Q Developer was instrumental in the development process:
- Code Generation: Used to generate the initial HTML structure and game canvas setup
- Best Practices: Provided guidance on game implementation and structure
- Abidance of Good SWE Principles: Ensured that poor code practices were avoided (i.e. arrowhead, nested loops, poor code commit language)
- Code Review: Helped identify and fix potential issues in the implementation

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
- Collapsible in-game guide panel displayed as a left sidebar

### AWS Amplify Hosting

## Game Rules (Also Available In-Game)
1. Start the game by clicking the "Start Game" button
2. You have 40 seconds to reach the target score
3. Click shape buttons to place them on the canvas
4. Each shape has a different point value:
    - Circle: 5 points
    - Square: 10 points
    - Triangle: 15 points
    - Diamond: -1 point (strategic negative point element)
5. Use the "Clear Space" button to reset the canvas

## License
MIT