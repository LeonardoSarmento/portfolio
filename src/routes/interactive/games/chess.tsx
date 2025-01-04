import { GamesHeader } from '@components/GamesHeader';
import { Icons } from '@components/icons/icon';
import { Button } from '@components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const Route = createFileRoute('/interactive/games/chess')({
  component: ChessGame,
});

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
];

function ChessGame() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [isWhiteTurn, setIsWhiteTurn] = useState(true);
  const [capturedWhitePieces, setCapturedWhitePieces] = useState<string[]>([]);
  const [capturedBlackPieces, setCapturedBlackPieces] = useState<string[]>([]);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('In Progress');

  // Helper function to determine if the target piece is an opponent's piece
  const isOpponentPiece = (piece: string, target: string): boolean => {
    return (
      (piece === piece.toLowerCase() && target === target.toUpperCase()) ||
      (piece === piece.toUpperCase() && target === target.toLowerCase())
    );
  };

  // Function to validate the movement of different pieces
  const isValidMove = (piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const rowDiff = Math.abs(fromRow - toRow);
    const colDiff = Math.abs(fromCol - toCol);

    switch (piece.toLowerCase()) {
      case 'p': // Pawn
        if (piece === 'p') {
          if (fromRow === 6 && rowDiff === 2 && colDiff === 0 && toRow === fromRow - 2 && board[toRow][toCol] === '') {
            return true;
          } else if (rowDiff === 1 && colDiff === 0 && board[toRow][toCol] === '') {
            return true;
          } else if (
            rowDiff === 1 &&
            colDiff === 1 &&
            board[toRow][toCol] !== '' &&
            isOpponentPiece(piece, board[toRow][toCol])
          ) {
            return true;
          }
        } else {
          if (fromRow === 1 && rowDiff === 2 && colDiff === 0 && toRow === fromRow + 2 && board[toRow][toCol] === '') {
            return true;
          } else if (rowDiff === 1 && colDiff === 0 && board[toRow][toCol] === '') {
            return true;
          } else if (
            rowDiff === 1 &&
            colDiff === 1 &&
            board[toRow][toCol] !== '' &&
            isOpponentPiece(piece, board[toRow][toCol])
          ) {
            return true;
          }
        }
        return false;

      case 'r': // Rook
        if (rowDiff === 0 || colDiff === 0) {
          return true;
        }
        break;

      case 'n': // Knight
        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
          return true;
        }
        break;

      case 'b': // Bishop
        if (rowDiff === colDiff) {
          return true;
        }
        break;

      case 'q': // Queen
        if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) {
          return true;
        }
        break;

      case 'k': // King
        if (rowDiff <= 1 && colDiff <= 1) {
          return true;
        }
        break;
    }
    return false;
  };

  const isCheck = (king: string, testBoard: string[][]): boolean => {
    const kingPosition = findKing(king, testBoard);
    if (!kingPosition) return false;
    const [kingRow, kingCol] = kingPosition;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = testBoard[row][col];
        if (piece === '') continue;
        if (isOpponentPiece(piece, testBoard[kingRow][kingCol])) {
          if (isValidMove(piece, row, col, kingRow, kingCol)) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const isCheckmate = (king: string, testBoard: string[][]): boolean => {
    const kingPosition = findKing(king, testBoard);
    if (!kingPosition) return false;
    const [kingRow, kingCol] = kingPosition;
    const validMoves = getValidKingMoves(kingRow, kingCol);

    for (const [row, col] of validMoves) {
      const newBoard = testBoard.map((row) => row.slice());
      newBoard[kingRow][kingCol] = '';
      newBoard[row][col] = king;

      if (!isCheck(king, newBoard)) {
        return false;
      }
    }
    return true;
  };

  const findKing = (king: string, testBoard: string[][]): [number, number] | null => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (testBoard[row][col] === king) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const getValidKingMoves = (row: number, col: number): [number, number][] => {
    const moves: [number, number][] = [];
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

    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        moves.push([newRow, newCol]);
      }
    }
    return moves;
  };

  const wouldCauseSelfCheck = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const tempBoard = board.map((row) => row.slice());
    const piece = tempBoard[fromRow][fromCol];
    tempBoard[toRow][toCol] = piece;
    tempBoard[fromRow][fromCol] = '';

    const king = piece === piece.toLowerCase() ? 'k' : 'K';
    return isCheck(king, tempBoard);
  };

  const handleCellClick = (row: number, col: number) => {
    if (selected) {
      const [selectedRow, selectedCol] = selected;
      const piece = board[selectedRow][selectedCol];
      const target = board[row][col];

      if (
        piece &&
        isValidMove(piece, selectedRow, selectedCol, row, col) &&
        (target === '' || isOpponentPiece(piece, target)) &&
        !wouldCauseSelfCheck(selectedRow, selectedCol, row, col)
      ) {
        const newBoard = board.map((row) => row.slice());
        newBoard[row][col] = piece;
        newBoard[selectedRow][selectedCol] = '';

        if (target) {
          if (target === target.toLowerCase()) {
            setCapturedWhitePieces((prev) => [...prev, target]);
          } else {
            setCapturedBlackPieces((prev) => [...prev, target]);
          }
        }

        setBoard(newBoard);
        setIsWhiteTurn(!isWhiteTurn);
        setMoveHistory((prev) => [...prev, `${piece} from (${selectedRow}, ${selectedCol}) to (${row}, ${col})`]);

        if (isCheck(isWhiteTurn ? 'K' : 'k', newBoard)) {
          setGameStatus('Check');
        } else if (isCheckmate(isWhiteTurn ? 'K' : 'k', newBoard)) {
          setGameStatus('Checkmate');
        }
      }
      setSelected(null);
    } else if (board[row][col] !== '') {
      if (
        (isWhiteTurn && board[row][col] === board[row][col].toUpperCase()) ||
        (!isWhiteTurn && board[row][col] === board[row][col].toLowerCase())
      ) {
        setSelected([row, col]);
      }
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setSelected(null);
    setIsWhiteTurn(true);
    setCapturedWhitePieces([]);
    setCapturedBlackPieces([]);
    setMoveHistory([]);
    setGameStatus('In Progress');
  };

  return (
    <div className="mx-auto flex flex-col items-center space-y-6 rounded-lg p-8">
      <GamesHeader routeId={Route.id} />
      <div className="text-lg font-bold">{gameStatus}</div>

      <div className="my-4 flex w-full justify-between">
        <div className="flex flex-col">
          <h2 className="font-semibold">White Captured:</h2>
          <div>{capturedWhitePieces.join(', ')}</div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">Black Captured:</h2>
          <div>{capturedBlackPieces.join(', ')}</div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-0">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selected && selected[0] === rowIndex && selected[1] === colIndex;
            return (
              <motion.div
                key={`${rowIndex}-${colIndex}`}
                className={`flex h-16 w-16 items-center justify-center border ${
                  (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-700'
                } ${isSelected ? 'ring-4 ring-yellow-500' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-2xl font-bold text-white">{cell && renderPiece(cell)}</span>
              </motion.div>
            );
          }),
        )}
      </div>

      <div className="mt-4 w-full">
        <h3 className="text-xl font-semibold">Move History</h3>
        <ul>
          {moveHistory.slice(-5).map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ul>
      </div>

      <Button onClick={resetGame} className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
        <Icons.restart />
      </Button>
    </div>
  );
}

function renderPiece(piece: string) {
  const pieceIcons: { [key: string]: string } = {
    k: '♔',
    q: '♕',
    r: '♖',
    b: '♗',
    n: '♘',
    p: '♙',
    K: '♚',
    Q: '♛',
    R: '♜',
    B: '♝',
    N: '♞',
    P: '♟',
  };
  return pieceIcons[piece] || '';
}
