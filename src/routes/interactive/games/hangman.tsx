import { Button } from '@components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { useEffect, useState, useCallback } from 'react';
import { GamesHeader } from '@components/GamesHeader';
import { Icons } from '@components/icons/icon';

export const Route = createFileRoute('/interactive/games/hangman')({
  component: HangmanGame,
});

function HangmanGame() {
  const maxAttempts = 6;

  const generateRandomWord = () => faker.word.noun().toLowerCase();

  const [word, setWord] = useState<string>(generateRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState<number>(0);

  const guessedWord = useCallback(() => {
    return word
      .split('')
      .map((letter) => (guessedLetters.has(letter) ? letter : '_'))
      .join(' ');
  }, [word, guessedLetters]);

  const handleGuess = useCallback(
    (letter: string) => {
      if (guessedLetters.has(letter) || wrongGuesses >= maxAttempts) return;

      setGuessedLetters((prev) => new Set(prev).add(letter));

      if (!word.includes(letter)) {
        setWrongGuesses((prev) => prev + 1);
      }
    },
    [guessedLetters, wrongGuesses, word],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (/^[a-z]$/.test(event.key)) {
        handleGuess(event.key);
      }
    },
    [handleGuess],
  );

  const resetGame = () => {
    setWord(generateRandomWord());
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  };

  const isGameOver = wrongGuesses >= maxAttempts;
  const isGameWon = guessedWord().split(' ').join('') === word;

  const renderScaffold = () => {
    const scaffoldStages = [
      `
-----
|    
|    
|    
|    
|    
      `,
      `
-----
|   O
|    
|    
|    
|    
      `,
      `
-----
|   O
|   |
|    
|    
|    
      `,
      `
-----
|   O
|  /|
|    
|    
|    
      `,
      `
-----
|   O
|  /|\\
|    
|    
|    
      `,
      `
-----
|   O
|  /|\\
|  / 
|    
|    
      `,
      `
-----
|   O
|  /|\\
|  / \\
|    
|    
      `,
    ];

    return scaffoldStages[wrongGuesses];
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="mx-auto flex flex-col items-center space-y-6 rounded-lg p-8">
      <GamesHeader routeId={Route.id} />
      <motion.pre
        className="font-mono text-2xl text-red-600"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {renderScaffold()}
      </motion.pre>
      <motion.div
        className="mb-6 font-mono text-3xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {guessedWord()}
      </motion.div>
      <div className="flex flex-col items-center space-y-2">
        {['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-2">
            {row.split('').map((letter) => (
              <Button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.has(letter) || isGameOver || isGameWon}
                className={`rounded-lg px-4 py-2 transition ${
                  guessedLetters.has(letter) ? 'bg-gray-400 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {letter.toUpperCase()}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col items-center space-y-4">
        <div className='flex items-center gap-x-1'>
          <Icons.losses />
          <p className="text-xl font-semibold pb-1">
            : {wrongGuesses} / {maxAttempts}
          </p>
        </div>
        {isGameOver && (
          <motion.p
            className="text-2xl font-bold text-red-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Game Over! The word was "{word.toUpperCase()}".
          </motion.p>
        )}
        {isGameWon && (
          <motion.p
            className="text-2xl font-bold text-green-600"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Congratulations! You guessed the word!
          </motion.p>
        )}
        <Button onClick={resetGame} className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
          <Icons.restart />
        </Button>
      </div>
    </div>
  );
}
