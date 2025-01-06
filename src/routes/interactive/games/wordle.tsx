import { Button } from '@components/ui/button';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { useState, useEffect, useCallback } from 'react';
import { Delete } from 'lucide-react';
import { GamesHeader } from '@components/GamesHeader';
import { Icons } from '@components/icons/icon';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/interactive/games/wordle')({
  component: WordleGame,
});

function WordleGame() {
  const wordLength = 5;
  const maxAttempts = 6;

  const generateRandomWord = () => faker.word.noun({ length: { min: wordLength, max: wordLength } }).toLowerCase();

  const [word, setWord] = useState<string>(generateRandomWord());
  const [attempts, setAttempts] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [letterHistory, setLetterHistory] = useState<Record<string, string>>({});
  const [guessHistory, setGuessHistory] = useState<string[][]>([]);

  const [stats, setStats] = useState({ wins: 0, losses: 0 });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isGameOver || isGameWon) return;

      if (event.key === 'Enter' && currentGuess.length === wordLength) {
        setAttempts((prev) => [...prev, currentGuess]);
        evaluateGuess(currentGuess);
        setCurrentGuess('');
      } else if (event.key === 'Backspace') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(event.key) && currentGuess.length < wordLength) {
        setCurrentGuess((prev) => prev + event.key.toLowerCase());
      }
    },
    [currentGuess, isGameOver, isGameWon],
  );

  const evaluateGuess = (guess: string) => {
    if (guess === word) {
      setIsGameWon(true);
      setStats((prev) => ({ ...prev, wins: prev.wins + 1 }));
    } else if (attempts.length + 1 === maxAttempts) {
      setIsGameOver(true);
      setStats((prev) => ({ ...prev, losses: prev.losses + 1 }));
    }
    updateGuessHistory(guess);
  };

  const updateGuessHistory = (guess: string) => {
    const wordArr = word.split('');
    const guessArr = guess.split('');
    const remainingLetters: (string | null)[] = [...wordArr];

    const guessResult = Array(wordLength).fill('');

    guessArr.forEach((letter, index) => {
      if (wordArr[index] === letter) {
        guessResult[index] = 'green';
        remainingLetters[index] = null;
      }
    });

    guessArr.forEach((letter, index) => {
      if (guessResult[index] !== 'green') {
        const letterIndex = remainingLetters.indexOf(letter);
        if (letterIndex !== -1) {
          guessResult[index] = 'yellow';
          remainingLetters[letterIndex] = null;
        } else {
          guessResult[index] = 'red';
        }
      }
    });

    setGuessHistory((prev) => [...prev, guessResult]);

    const newHistory: Record<string, string> = {};
    guessArr.forEach((letter, index) => {
      const currentColor = newHistory[letter] || 'gray';
      const newColor = guessResult[index];
      if (newColor === 'green' || (newColor === 'yellow' && currentColor !== 'green') || currentColor === 'gray') {
        newHistory[letter] = newColor;
      }
    });
    setLetterHistory((prev) => ({ ...prev, ...newHistory }));
  };

  const resetGame = () => {
    setWord(generateRandomWord());
    setAttempts([]);
    setCurrentGuess('');
    setIsGameOver(false);
    setIsGameWon(false);
    setLetterHistory({});
    setGuessHistory([]);

    // Ensure focus is restored to the document
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement | null;
      activeElement?.blur(); // Call blur() only if it's an HTMLElement
      window.focus(); // Ensure the window is focused
    }, 0);
  };

  useEffect(() => {
    const handleKeyDownWrapper = (event: KeyboardEvent) => {
      if (isGameOver || isGameWon) return;
      handleKeyDown(event);
    };

    window.addEventListener('keydown', handleKeyDownWrapper);
    return () => window.removeEventListener('keydown', handleKeyDownWrapper);
  }, [handleKeyDown, isGameOver, isGameWon]);

  const renderBoard = () => {
    return Array.from({ length: maxAttempts }, (_, attemptIndex) => {
      const guess = attempts[attemptIndex] || '';
      const isCurrent = attemptIndex === attempts.length && !isGameOver && !isGameWon;

      return (
        <div key={attemptIndex} className="flex justify-center space-x-2">
          {Array.from({ length: wordLength }, (_, letterIndex) => {
            const letter = isCurrent ? currentGuess[letterIndex] || '' : guess[letterIndex] || '';
            const tileColor = isCurrent
              ? 'bg-muted'
              : (guessHistory[attemptIndex] && guessHistory[attemptIndex][letterIndex]) === 'green'
                ? 'bg-green-600'
                : (guessHistory[attemptIndex] && guessHistory[attemptIndex][letterIndex]) === 'yellow'
                  ? 'bg-yellow-600'
                  : (guessHistory[attemptIndex] && guessHistory[attemptIndex][letterIndex]) === 'red'
                    ? 'bg-red-800'
                    : 'bg-gray-300';

            return (
              <motion.div
                key={letterIndex}
                className={`flex h-14 w-14 items-center justify-center rounded-lg border border-primary text-xl font-bold ${tileColor}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {letter.toUpperCase()}
              </motion.div>
            );
          })}
        </div>
      );
    });
  };

  const renderKeyboard = () => {
    return ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((row, rowIndex) => (
      <div key={rowIndex} className="flex space-x-2">
        {row.split('').map((letter) => {
          const letterColor =
            letterHistory[letter] === 'green'
              ? 'bg-green-600'
              : letterHistory[letter] === 'yellow'
                ? 'bg-yellow-600'
                : letterHistory[letter] === 'red'
                  ? 'bg-red-800'
                  : 'bg-primary';

          const handleClick = () => {
            if (currentGuess.length < wordLength) {
              setCurrentGuess((prev) => prev + letter);
            }
          };
          return (
            <Button
              key={letter}
              disabled={isGameOver || isGameWon}
              className={`rounded-md px-4 py-2 ${letterColor}`}
              onClick={handleClick}
            >
              {letter.toUpperCase()}
            </Button>
          );
        })}
        {rowIndex === 2 && (
          <>
            <Button
              key="enter"
              disabled={isGameOver || isGameWon}
              className="rounded-md px-4 py-2"
              onClick={() => {
                if (currentGuess.length === wordLength) {
                  setAttempts((prev) => [...prev, currentGuess]);
                  evaluateGuess(currentGuess);
                  setCurrentGuess('');
                }
              }}
            >
              Enter
            </Button>
            <Button
              key="backspace"
              disabled={isGameOver || isGameWon}
              className="rounded-md px-4 py-2"
              onClick={() => {
                setCurrentGuess((prev) => prev.slice(0, -1));
              }}
            >
              <Delete />
            </Button>
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="flex">
      <div className="mx-auto flex flex-1 flex-col items-end space-y-6 p-8">
        <GamesHeader routeId={Route.id} className="mx-6" />
        <div className="mx-32 flex flex-col space-y-4">{renderBoard()}</div>
        <div className="mx-12 flex flex-col items-center space-y-2">{renderKeyboard()}</div>
        {isGameOver && (
          <motion.p
            className="mx-20 text-2xl font-bold text-red-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Game Over! The word was "{word.toUpperCase()}".
          </motion.p>
        )}
        {isGameWon && (
          <motion.p
            className="mx-16 text-2xl font-bold text-green-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Congratulations! You guessed the word!
          </motion.p>
        )}
      </div>
      <div className="flex w-1/3 flex-col items-start justify-center gap-y-6">
        <p className="flex items-center gap-x-2">
          <Icons.score />: {stats.wins}
        </p>
        <p className="flex items-center gap-x-2">
          <Icons.losses />: {stats.losses}
        </p>
        <Button variant="destructive" onClick={resetGame}>
          <Icons.restart />
        </Button>
      </div>
    </div>
  );
}
