# Building a Classic Snake Game with TypeScript and React

As part of my ongoing learning journey, I decided to recreate the classic Snake game using TypeScript and React. The goal was to develop a simple, yet engaging interactive experience with smooth animations and responsive controls. Here's how I built it and the key features that made the project come to life.

## Game Features

The Snake game is implemented using the following features:

- **Grid-Based Gameplay**: The game board consists of a 20x20 grid where the snake moves in a grid-based manner. Each movement step updates the snake's position, checks for collisions, and handles eating food.
- **Snake Movement**: The snake moves using the arrow keys. The logic ensures that the snake cannot move in the opposite direction, creating a more challenging experience.
- **Food Mechanics**: Every time the snake eats the food, its length increases, and new food is generated at a random position on the grid.
- **Game Over and Restart**: The game ends if the snake collides with itself, and players can restart or pause the game at any time.

## Technical Highlights

- **State Management**: React’s `useState` and `useEffect` hooks were essential in managing the game’s state, including the snake's position, food placement, score, and timer.
- **Motion for Animations**: I used Framer Motion to create smooth transitions for the snake and food on the game grid. Each element is animated to enhance the visual appeal and make the gameplay more fluid.
- **Routing with TanStack Router**: For navigation, I integrated TanStack Router to manage game routes within the broader application.
- **Button Controls**: I implemented custom buttons to start, pause, and restart the game using `shadcn/ui` components. The buttons are disabled when needed to avoid conflicting actions, like starting a new game when one is already running.

## User Experience

The game features a clean and simple interface, where players can track their score and time elapsed at the top. The game controls are intuitive, with keyboard input for moving the snake and on-screen buttons to control the game’s flow.

#### Key Code Snippet

Here’s an example of the main game loop where the snake’s movement and collision detection are handled:

```typescript
React.useEffect(() => {
  if (!isRunning || isPaused) return;

  const interval = setInterval(() => {
    if (gameOver || (nextDirection.x === 0 && nextDirection.y === 0)) return;

    setDirection(nextDirection);

    setSnake((prevSnake) => {
      const newHead = {
        x: (prevSnake[0].x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, SPEED);

  return () => clearInterval(interval);
}, [nextDirection, food, gameOver, isRunning, isPaused]);
```

## Conclusion

This project was a great exercise in applying React, TypeScript, and motion libraries to create a fun, interactive game. It helped me deepen my understanding of state management and animations, while also enhancing my problem-solving skills when dealing with game logic. If you’re interested in game development with React, I highly recommend trying to build a project like this.

If you're interested, feel free to check out the full code on my [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/snake.tsx) or try the live demo on my [portfolio](https://www.leosarmento.com/interactive/games/snake)

---
