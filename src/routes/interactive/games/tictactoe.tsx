import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/interactive/games/tictactoe')({
  component: TicTacToe,
});

function TicTacToe() {
  const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState<'X' | 'O' | 'Draw' | null>(null);
  const [gameMode, setGameMode] = useState<'Player' | 'AI'>('Player');
  const [aiDifficulty, setAiDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  useEffect(() => {
    if (gameMode === 'AI' && !isXTurn && !winner) {
      const timer = setTimeout(() => makeAIMove(board), 500);
      return () => clearTimeout(timer);
    }
  }, [board, isXTurn, gameMode, winner]);

  const handleCellClick = (index: number) => {
    if (board[index] || winner || (gameMode === 'AI' && !isXTurn)) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWinner(newBoard);
  };

  const makeAIMove = (board: ('X' | 'O' | null)[]) => {
    let move;
    if (aiDifficulty === 'Easy') {
      move = makeRandomMove(board);
    } else if (aiDifficulty === 'Medium') {
      move = makeMediumMove(board);
    } else if (aiDifficulty === 'Hard') {
      move = makeHardMove(board);
    }
    if (move !== undefined) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      setBoard(newBoard);
      setIsXTurn(true);
      checkWinner(newBoard);
    }
  };

  const makeRandomMove = (board: ('X' | 'O' | null)[]) => {
    const availableMoves = board.map((cell, index) => (cell === null ? index : null)).filter((index) => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const makeMediumMove = (board: ('X' | 'O' | null)[]) => {
    return makeRandomMove(board);
  };

  const makeHardMove = (board: ('X' | 'O' | null)[]) => {
    return makeRandomMove(board);
  };

  const checkWinner = (board: ('X' | 'O' | null)[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell)) {
      setWinner('Draw');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  };

  const startGame = (mode: 'Player' | 'AI', difficulty: 'Easy' | 'Medium' | 'Hard' = 'Easy') => {
    setGameMode(mode);
    setAiDifficulty(difficulty);
    resetGame();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <motion.h1
        className="text-4xl font-extrabold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Tic Tac Toe
      </motion.h1>
      <div className="flex space-x-4">
        <Button
          onClick={() => startGame('Player')}
          className={`px-4 py-2 ${gameMode === 'Player' ? 'bg-green-500 text-white' : ''}`}
        >
          Player vs Player
        </Button>
        <Button
          onClick={() => startGame('AI', 'Easy')}
          className={`px-4 py-2 ${gameMode === 'AI' && aiDifficulty === 'Easy' ? 'bg-blue-500 text-white' : ''}`}
        >
          AI Easy
        </Button>
        <Button
          onClick={() => startGame('AI', 'Medium')}
          className={`px-4 py-2 ${gameMode === 'AI' && aiDifficulty === 'Medium' ? 'bg-blue-500 text-white' : ''}`}
        >
          AI Medium
        </Button>
        <Button
          onClick={() => startGame('AI', 'Hard')}
          className={`px-4 py-2 ${gameMode === 'AI' && aiDifficulty === 'Hard' ? 'bg-blue-500 text-white' : ''}`}
        >
          AI Hard
        </Button>
      </div>
      <p className="text-lg">
        Current Mode:{' '}
        <span className="font-bold">{gameMode === 'Player' ? 'Player vs Player' : `AI (${aiDifficulty})`}</span>
      </p>
      <Card className="grid grid-cols-3 gap-3 p-3">
        {board.map((cell, index) => (
          <motion.div
            key={index}
            className="flex h-20 w-20 items-center justify-center rounded-lg border border-gray-300 hover:bg-muted"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleCellClick(index)}
          >
            {cell && (
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
      </Card>
      {winner && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl font-semibold">{winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`}</p>
          <Button onClick={resetGame} className="mt-4 bg-red-500 px-4 py-2 text-white">
            Play Again
          </Button>
        </motion.div>
      )}
    </div>
  );
}
