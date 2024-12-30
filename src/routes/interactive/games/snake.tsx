import { Button } from '@components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import React from 'react';

export const Route = createFileRoute('/interactive/games/snake')({
  component: SnakeGame,
});

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const SPEED = 200;

function SnakeGame() {
  const [snake, setSnake] = React.useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = React.useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = React.useState<Point>({ x: 0, y: 0 });
  const [nextDirection, setNextDirection] = React.useState<Point>({ x: 0, y: 0 });
  const [gameOver, setGameOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRunning || isPaused) return;

      let newDirection = { x: 0, y: 0 };

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) newDirection = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (direction.y === 0) newDirection = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (direction.x === 0) newDirection = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (direction.x === 0) newDirection = { x: 1, y: 0 };
          break;
      }

      setNextDirection(newDirection);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isRunning, isPaused]);

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

  React.useEffect(() => {
    if (!isRunning || isPaused) return;

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    setGameOver(false);
    setTimer(0);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: 0 });
    setNextDirection({ x: 0, y: 0 });
  };

  const handleRestart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: 0 });
    setNextDirection({ x: 0, y: 0 });
    setGameOver(false);
    setTimer(0);
    setScore(0);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-4 flex space-x-4">
        <Button onClick={handleStart} disabled={isRunning && !isPaused}>
          Start
        </Button>
        <Button onClick={handleRestart}>Restart</Button>
        {isPaused ? (
          <Button onClick={handleResume}>Resume</Button>
        ) : (
          <Button onClick={handleStop} disabled={!isRunning}>
            Stop
          </Button>
        )}
      </div>

      <div className="mb-4 flex space-x-8">
        <div>Score: {score}</div>
        <div>Time: {timer}s</div>
      </div>

      {gameOver ? (
        <div className="text-center">
          <h1 className="mb-4 text-3xl">Game Over</h1>
        </div>
      ) : (
        <motion.div
          className="grid gap-0.5"
          style={{ gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <motion.div
                key={index}
                className={`h-5 w-5 ${isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-gray-800'}`}
                layout
                transition={{ duration: 0.2 }}
              ></motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
