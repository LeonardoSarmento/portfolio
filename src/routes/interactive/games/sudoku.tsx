import { GamesHeader } from '@components/GamesHeader';
import { Icons } from '@components/icons/icon';
import { Button } from '@components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Eraser } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export const Route = createFileRoute('/interactive/games/sudoku')({
  component: TheSudokuGame,
});

function TheSudokuGame() {
  const MAX_ERRORS = 3;

  const errorCountRef = useRef(0);
  const previousInvalidCells = useRef<Set<string>>(new Set());
  const [modifiedCells, setModifiedCells] = useState<Set<string>>(new Set());

  const generateRandomPositions = (): [number, number][] => {
    const positions: [number, number][] = [];
    while (positions.length < 9) {
      const randomRow = Math.floor(Math.random() * 9);
      const randomCol = Math.floor(Math.random() * 9);
      if (!positions.some(([r, c]) => r === randomRow && c === randomCol)) {
        positions.push([randomRow, randomCol]);
      }
    }
    return positions;
  };

  const initializeGrid = (): { value: number; isFixed: boolean; isInvalid: boolean }[][] => {
    const grid = Array.from({ length: 9 }, () => Array(9).fill({ value: 0, isFixed: false, isInvalid: false }));
    const fixedPositions = generateRandomPositions();
    const fixedNumbers = [5, 3, 7, 2, 9, 6, 4, 8, 1];
    fixedPositions.forEach(([row, col], index) => {
      grid[row][col] = { value: fixedNumbers[index], isFixed: true, isInvalid: false };
    });
    return grid;
  };

  const [grid, setGrid] = useState(initializeGrid());
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col].isFixed || gameOver) return; // Prevent selecting fixed cells
    setSelectedCell({ row, col });
  };

  const handleNumberInput = (num: number) => {
    if (!selectedCell || gameOver) return;

    const { row, col } = selectedCell;

    // Prevent input if the selected cell is fixed
    if (grid[row][col].isFixed) {
      return;
    }

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => row.map((cell) => ({ ...cell })));

      const currentCell = newGrid[row][col];
      const wasInvalid = currentCell.isInvalid;

      const isValid = validateInput(num, row, col);

      if (isValid) {
        currentCell.value = num;
        currentCell.isInvalid = false;

        // If it was previously invalid, DO NOT decrement the error count
        if (wasInvalid) {
          const cellKey = `${row}-${col}`;
          if (previousInvalidCells.current.has(cellKey)) {
            previousInvalidCells.current.delete(cellKey);
            // Do NOT decrement error count here
          }
        }
      } else {
        currentCell.value = num;
        currentCell.isInvalid = true;

        // If it was not previously invalid, increase the error count
        const cellKey = `${row}-${col}`;
        if (!wasInvalid && !previousInvalidCells.current.has(cellKey)) {
          previousInvalidCells.current.add(cellKey);
          errorCountRef.current += 1;
        }
      }

      // Track modified cells (those filled by the player)
      setModifiedCells((prev) => new Set(prev).add(`${row}-${col}`));

      if (errorCountRef.current >= MAX_ERRORS) {
        setGameOver(true);
      }

      return newGrid;
    });
  };

  const validateInput = (num: number, row: number, col: number): boolean => {
    const rowValid = checkRow(grid, row, num, col);
    const colValid = checkColumn(grid, col, num, row);
    const subgridValid = checkSubgrid(grid, row, col, num);

    return rowValid && colValid && subgridValid;
  };

  const checkRow = (grid: { value: number }[][], row: number, num: number, col: number): boolean => {
    return !grid[row].some((cell, idx) => cell.value === num && idx !== col);
  };

  const checkColumn = (grid: { value: number }[][], col: number, num: number, row: number): boolean => {
    return !grid.some((r) => r[col].value === num && r !== grid[row]);
  };

  const checkSubgrid = (grid: { value: number }[][], row: number, col: number, num: number): boolean => {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (grid[r][c].value === num && !(r === row && c === col)) return false;
      }
    }
    return true;
  };

  const checkWin = (): boolean => {
    return grid.every((row) => row.every((cell) => cell.value !== 0 && !cell.isInvalid));
  };

  useEffect(() => {
    if (checkWin() && !gameOver) {
      setGameOver(true);
    }
  }, [grid]);

  const handleNewGame = () => {
    setGrid(initializeGrid());
    errorCountRef.current = 0;
    previousInvalidCells.current.clear();
    setModifiedCells(new Set());
    setGameOver(false);
    setSelectedCell(null);
  };

  const handleClearInputs = () => {
    // Clear only the modified cells, preserving the fixed cells
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (!cell.isFixed && modifiedCells.has(`${rowIndex}-${colIndex}`)) {
            return { ...cell, value: 0, isInvalid: false };
          }
          return cell;
        }),
      );
      return newGrid;
    });

    setModifiedCells(new Set());

    errorCountRef.current = 0;
    previousInvalidCells.current.clear();

    if (gameOver) {
      setGameOver(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
      }

      const { key } = event;

      if (selectedCell) {
        const { row, col } = selectedCell;

        if (key === 'ArrowUp' || key === 'w') {
          if (row > 0) {
            setSelectedCell({ row: row - 1, col });
          }
        } else if (key === 'ArrowDown' || key === 's') {
          if (row < 8) {
            setSelectedCell({ row: row + 1, col });
          }
        } else if (key === 'ArrowLeft' || key === 'a') {
          if (col > 0) {
            setSelectedCell({ row, col: col - 1 });
          }
        } else if (key === 'ArrowRight' || key === 'd') {
          if (col < 8) {
            setSelectedCell({ row, col: col + 1 });
          }
        }
      }

      if (key >= '1' && key <= '9') {
        handleNumberInput(Number(key));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCell, gameOver]);

  function AmountOfWrongGuesses() {
    return (
      <div className="flex items-center gap-x-1">
        <Icons.losses />
        <p className="pb-1">
          : {errorCountRef.current}/{MAX_ERRORS}
        </p>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col items-end space-y-6 rounded-lg px-8" tabIndex={-1}>
        <GamesHeader routeId={Route.id} />
        <div className="mb-6 grid grid-cols-9 gap-1">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`flex h-16 w-16 items-center justify-center rounded-lg border transition-all duration-300 ${
                  selectedCell?.row === rowIndex && selectedCell?.col === colIndex ? 'scale-105 bg-blue-200' : ''
                } ${cell.isInvalid ? 'border-red-500 bg-red-200' : ''} ${
                  cell.value === 0 && selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                    ? 'bg-gray-200'
                    : ''
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                whileHover={{ scale: 1.1 }}
              >
                {cell.value !== 0 && (
                  <motion.span
                    className={`text-3xl font-bold ${cell.isInvalid ? 'text-red-500' : ''}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {cell.value}
                  </motion.span>
                )}
              </motion.div>
            )),
          )}
        </div>
        {gameOver && (
          <p className="mr-16 mt-4 flex items-center gap-x-4 text-xl text-red-500">
            Você perdeu! Clique em {<Eraser />} para tentar novamente.
          </p>
        )}
        <div className="mt-4 flex space-x-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button
              key={num}
              onClick={() => handleNumberInput(num)}
              className="h-14 w-14 rounded-lg bg-gray-300 text-2xl font-bold transition hover:bg-gray-400"
            >
              {num}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-start justify-center gap-y-5 text-xl font-semibold">
        <p>{gameOver ? 'Você perdeu!' : <AmountOfWrongGuesses />}</p>
        <Button
          onClick={handleNewGame}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          <Icons.startGame />
        </Button>
        <Button
          onClick={handleClearInputs}
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
        >
          <Eraser />
        </Button>
      </div>
    </div>
  );
}
