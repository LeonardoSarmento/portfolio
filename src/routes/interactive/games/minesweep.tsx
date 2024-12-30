import { Button } from '@components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@components/ui/select';
import useSessionStorage from '@services/hooks/useSessionStorage';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import React from 'react';

export const Route = createFileRoute('/interactive/games/minesweep')({
  component: MineSweepGame,
});

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type Difficulty = {
  rows: number;
  cols: number;
  mines: number;
};

const DIFFICULTIES: Record<string, Difficulty> = {
  Easy: { rows: 8, cols: 8, mines: 10 },
  Medium: { rows: 16, cols: 16, mines: 40 },
  Hard: { rows: 16, cols: 30, mines: 99 },
};

function MineSweepGame() {
  const [difficulty, setDifficulty] = useSessionStorage('difficulty', DIFFICULTIES.Easy);
  const [board, setBoard] = useSessionStorage<Cell[][]>('board', []);
  const [isGameOver, setIsGameOver] = useSessionStorage('isGameOver', false);
  const [isWin, setIsWin] = useSessionStorage('isWin', false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [score, setScore] = useSessionStorage('score', 0);
  const [isExploding, setIsExploding] = React.useState(false); // To trigger explosion animation

  React.useEffect(() => {
    if (gameStarted && !board.length) initializeBoard();
  }, [gameStarted, board.length]);

  const initializeBoard = () => {
    try {
      const { rows, cols, mines } = difficulty;

      // Reset score when starting a new game
      setScore(0);

      // Generate empty board
      const newBoard: Cell[][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        })),
      );

      // Place mines randomly
      let minesPlaced = 0;
      while (minesPlaced < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!newBoard[row][col].isMine) {
          newBoard[row][col].isMine = true;
          minesPlaced++;
        }
      }

      // Calculate adjacent mines
      newBoard.forEach((row, rIdx) =>
        row.forEach((cell, cIdx) => {
          if (!cell.isMine) {
            cell.adjacentMines = countAdjacentMines(newBoard, rIdx, cIdx);
          }
        }),
      );

      setBoard(newBoard);
      setIsGameOver(false);
      setIsWin(false);
      setIsExploding(false); // Reset the explosion animation state
    } catch (error) {
      console.error('Error initializing board:', error);
      alert('There was an error initializing the game board.');
    }
  };

  const countAdjacentMines = (board: Cell[][], row: number, col: number): number => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    return directions.reduce((count, [dr, dc]) => {
      const newRow = row + dr;
      const newCol = col + dc;
      if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board[0].length &&
        board[newRow][newCol].isMine
      ) {
        count++;
      }
      return count;
    }, 0);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isGameOver || isWin || board[row][col].isFlagged || board[row][col].isRevealed) return;

    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.isMine) {
      setIsExploding(true); // Trigger explosion animation
      setTimeout(() => {
        setIsGameOver(true);
        revealBoard(newBoard);
        setScore(0); // Reset score to zero when hitting a mine
      }, 1000); // Wait for explosion animation before resetting the game
    } else {
      revealCell(newBoard, row, col);
      checkWin(newBoard);
      setScore((prevScore) => prevScore + cell.adjacentMines); // Increase score based on adjacent mines
    }

    setBoard(newBoard);
  };

  const revealCell = (board: Cell[][], row: number, col: number) => {
    const cell = board[row][col];
    if (cell.isRevealed || cell.isMine) return;

    cell.isRevealed = true;

    if (cell.adjacentMines === 0) {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        /* current */ [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      directions.forEach(([dr, dc]) => {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length) {
          revealCell(board, newRow, newCol);
        }
      });
    }
  };

  const revealBoard = (board: Cell[][]) => {
    board.forEach((row) => row.forEach((cell) => (cell.isRevealed = true)));
  };

  const handleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (isGameOver || isWin || board[row][col].isRevealed) return;

    const newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  };

  const checkWin = (board: Cell[][]) => {
    const { rows, cols } = difficulty;
    let hasWon = true;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = board[r][c];
        if (!cell.isMine && !cell.isRevealed) {
          hasWon = false;
          break;
        }
      }
    }

    if (hasWon) setIsWin(true);
  };

  const handleDifficultyChange = (value: string) => {
    setDifficulty(DIFFICULTIES[value] || DIFFICULTIES.Easy);
    setGameStarted(false); // Reset game state on difficulty change
    setBoard([]);
    setIsGameOver(false);
    setIsWin(false);
    setScore(0); // Reset score
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="mb-4 text-4xl font-semibold">Minesweeper</h1>

      <div className="mb-4">
        <label htmlFor="difficulty" className="mr-2 text-lg">
          Difficulty:
        </label>
        <Select onValueChange={handleDifficultyChange}>
          <SelectTrigger className="w-40 rounded-md p-2">
            <SelectValue placeholder="Select Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(DIFFICULTIES).map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <span className="text-lg">Score: {score}</span>
      </div>

      <Button
        className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700"
        onClick={() => {
          if (!difficulty) {
            alert('Please select a difficulty level before starting the game!');
            return;
          }
          try {
            initializeBoard();
            setGameStarted(true);
          } catch (error) {
            console.error('Error starting the game:', error);
            alert('An error occurred while starting the game.');
          }
        }}
        disabled={!difficulty}
      >
        Start Game
      </Button>

      {isGameOver && (
        <motion.div
          className="text-2xl text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Game Over! 💣
        </motion.div>
      )}
      {isWin && (
        <motion.div
          className="text-2xl text-green-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          You Win! 🎉
        </motion.div>
      )}

      {/* Display the grid only after the game has started */}
      {gameStarted && board.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${difficulty.rows}, 1fr)`,
            gridTemplateColumns: `repeat(${difficulty.cols}, 1fr)`,
          }}
        >
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className={`relative flex h-10 w-10 items-center justify-center border text-sm transition-all duration-500 cursor-pointer ${
                  cell.isRevealed ? (cell.isMine ? 'bg-red-500 text-white' : 'bg-gray-300 text-black') : 'bg-gray-700'
                }`}
                onClick={() => handleCellClick(rIdx, cIdx)}
                onContextMenu={(e) => handleFlag(e, rIdx, cIdx)}
              >
                {/* Explosion animation overlay */}
                {isExploding && cell.isMine && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-red-500"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  ></motion.div>
                )}

                {/* Smooth mine reveal */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    cell.isRevealed && cell.isMine ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  💣
                </div>

                {/* Adjacent mine numbers or flags */}
                {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0 && (
                  <span className="relative">{cell.adjacentMines}</span>
                )}
                {cell.isFlagged && !cell.isRevealed && <span className="relative">🚩</span>}
              </div>
            )),
          )}
        </div>
      )}
    </div>
  );
}

export default MineSweepGame;
