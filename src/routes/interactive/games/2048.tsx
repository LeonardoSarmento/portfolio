import { GamesHeader } from '@components/GamesHeader';
import { Icons } from '@components/icons/icon';
import { Button } from '@components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

export const Route = createFileRoute('/interactive/games/2048')({
  component: The2048Game,
});

function The2048Game() {
  const initializeGrid = (): number[][] => {
    const newGrid = Array.from({ length: 4 }, () => Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    return newGrid;
  };

  const [grid, setGrid] = useState<number[][]>(initializeGrid());
  const [score, setScore] = useState(0);

  function addRandomTile(grid: number[][]): void {
    const emptyCells: [number, number][] = [];

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) emptyCells.push([rowIndex, colIndex]);
      });
    });

    if (emptyCells.length > 0) {
      const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  const handleMove = useCallback(
    (direction: string): void => {
      setGrid((prevGrid) => {
        const newGrid = JSON.parse(JSON.stringify(prevGrid));

        let tempScore = score; // Captura o valor atual do score

        switch (direction) {
          case 'ArrowUp':
            tempScore = moveUp(newGrid, tempScore);
            break;
          case 'ArrowDown':
            tempScore = moveDown(newGrid, tempScore);
            break;
          case 'ArrowLeft':
            tempScore = moveLeft(newGrid, tempScore);
            break;
          case 'ArrowRight':
            tempScore = moveRight(newGrid, tempScore);
            break;
        }

        addRandomTile(newGrid);
        setScore(tempScore); // Atualiza o score de forma segura
        return newGrid;
      });
    },
    [score],
  );

  const moveLeft = (grid: number[][], tempScore: number): number => {
    for (let row = 0; row < 4; row++) {
      const filteredRow = grid[row].filter((num) => num !== 0);
      for (let col = 0; col < filteredRow.length - 1; col++) {
        if (filteredRow[col] === filteredRow[col + 1]) {
          filteredRow[col] *= 2;
          tempScore += filteredRow[col];
          filteredRow.splice(col + 1, 1);
        }
      }
      grid[row] = [...filteredRow, ...Array(4 - filteredRow.length).fill(0)];
    }
    return tempScore;
  };

  const moveRight = (grid: number[][], tempScore: number): number => {
    for (let row = 0; row < 4; row++) {
      const filteredRow = grid[row].filter((num) => num !== 0);
      for (let col = filteredRow.length - 1; col > 0; col--) {
        if (filteredRow[col] === filteredRow[col - 1]) {
          filteredRow[col] *= 2;
          tempScore += filteredRow[col];
          filteredRow.splice(col - 1, 1);
        }
      }
      grid[row] = [...Array(4 - filteredRow.length).fill(0), ...filteredRow];
    }
    return tempScore;
  };

  const moveUp = (grid: number[][], tempScore: number): number => {
    for (let col = 0; col < 4; col++) {
      const filteredCol = grid.map((row) => row[col]).filter((num) => num !== 0);
      for (let row = 0; row < filteredCol.length - 1; row++) {
        if (filteredCol[row] === filteredCol[row + 1]) {
          filteredCol[row] *= 2;
          tempScore += filteredCol[row];
          filteredCol.splice(row + 1, 1);
        }
      }
      for (let row = 0; row < 4; row++) {
        grid[row][col] = filteredCol[row] || 0;
      }
    }
    return tempScore;
  };

  const moveDown = (grid: number[][], tempScore: number): number => {
    for (let col = 0; col < 4; col++) {
      const filteredCol = grid.map((row) => row[col]).filter((num) => num !== 0);
      for (let row = filteredCol.length - 1; row > 0; row--) {
        if (filteredCol[row] === filteredCol[row - 1]) {
          filteredCol[row] *= 2;
          tempScore += filteredCol[row];
          filteredCol.splice(row - 1, 1);
        }
      }
      for (let row = 0; row < 4; row++) {
        grid[row][col] = filteredCol[filteredCol.length - 4 + row] || 0;
      }
    }
    return tempScore;
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        handleMove(event.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  return (
    <div className="mx-auto flex flex-col items-center space-y-6 rounded-lg p-8">
      <GamesHeader routeId={Route.id} />
      <div className="mb-6 grid grid-cols-4 gap-4">
        {grid.flat().map((cell, index) => (
          <motion.div
            key={index}
            className={`flex h-24 w-24 items-center justify-center rounded-lg ${cell >= 0 && cell <= 2048 ? `bg-tile-${cell}` : 'bg-tile'} `}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {cell !== 0 && (
              <motion.span
                className="text-3xl font-bold"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {cell}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center gap-x-10 text-xl font-semibold">
        <Button
          onClick={() => {
            setGrid(initializeGrid());
            setScore(0);
          }}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <Icons.restart />
        </Button>
        <p className="flex items-center gap-x-2">
          <Icons.score />: {score}
        </p>
      </div>
    </div>
  );
}
