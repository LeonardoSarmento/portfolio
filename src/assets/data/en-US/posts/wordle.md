# Building a Fun Wordle Clone with React, TypeScript, and Motion

Creating a Wordle clone is a fun way to test your React, TypeScript, and animation skills. In this post, I'll walk you through building a fully-featured Wordle game using React, TypeScript, and libraries like `motion` from Framer Motion, `shadcn/ui` for components, and `faker` for generating random words.

This project is a great exercise in managing game state, handling user input, and creating smooth UI transitions. Let’s dive into the code and its functionalities.

## 1. **Setting Up the Game Structure**

We start by defining the core structure of our game:

- **Word to Guess**: A random 5-letter word generated at the start of the game.
- **User Guesses**: The player will try to guess the word, with a limited number of attempts (6 guesses).
- **Game State**: We manage the game state with variables like `word`, `attempts`, `currentGuess`, and `isGameOver` to track the player’s progress.

## 2. **State Management**

The game heavily relies on React state to track key elements:

- `word`: The secret word to be guessed, randomly generated at the start.
- `attempts`: Stores the guesses made by the player so far.
- `currentGuess`: The player's ongoing guess.
- `isGameOver` & `isGameWon`: Flags to determine if the game is over or won.
- `letterHistory`: Keeps track of the status of each letter (correct, incorrect, or misplaced).
- `guessHistory`: Stores the result of each guess (green, yellow, red).

Here’s how the state is managed using React’s `useState` hook:

```typescript
const [word, setWord] = useState(generateRandomWord());
const [attempts, setAttempts] = useState<string[]>([]);
const [currentGuess, setCurrentGuess] = useState<string>('');
const [isGameOver, setIsGameOver] = useState(false);
const [isGameWon, setIsGameWon] = useState(false);
const [letterHistory, setLetterHistory] = useState<Record<string, string>>({});
const [guessHistory, setGuessHistory] = useState<string[][]>([]);
```

## 3. **Handling User Input**

The game listens for keyboard input to manage guesses. We handle three types of input:

- **Letter keys**: Adds a letter to the `currentGuess` if the player hasn’t yet guessed all the letters.
- **Backspace**: Deletes the last character from the `currentGuess`.
- **Enter**: Submits the current guess and triggers the evaluation.

Here’s how the keyboard input is managed:

```typescript
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
```

## 4. **Guess Evaluation Logic**

Each time the user submits a guess, we evaluate it based on the following rules:

- **Green**: The letter is correct and in the correct position.
- **Yellow**: The letter is in the word but in the wrong position.
- **Red**: The letter is not in the word.

Here’s how we evaluate each guess:

```typescript
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
  setLetterHistory((prev) => ({
    ...prev,
    ...guessResult.reduce(
      (acc, color, idx) => {
        acc[guessArr[idx]] = color;
        return acc;
      },
      {} as Record<string, string>,
    ),
  }));
};
```

## 5. **Animating UI with Framer Motion**

To enhance the user experience, we use `motion` components from Framer Motion to animate the UI. For instance, each letter tile in the grid has a smooth animation when it’s revealed, scaling in from a smaller size to the full size.

Here’s how the animation is applied to each guess:

```typescript
<motion.div
  key={letterIndex}
  className={`flex h-14 w-14 items-center justify-center rounded-lg border border-primary text-xl font-bold ${tileColor}`}
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.2 }}
>
  {letter.toUpperCase()}
</motion.div>
```

We use similar animations for displaying the win or loss messages after the game ends, with text appearing smoothly to give feedback to the player.

## 6. **Rendering the Virtual Keyboard**

The virtual keyboard is made of buttons for each letter of the alphabet. When a player clicks on a letter, it’s added to the `currentGuess`. The button colors change dynamically based on the status of the letter (green, yellow, red).

Here’s the code for rendering the keyboard:

```typescript
<Button
  key={letter}
  disabled={isGameOver || isGameWon}
  className={`rounded-md px-4 py-2 ${letterColor}`}
  onClick={handleClick}
>
  {letter.toUpperCase()}
</Button>
```

## 7. **Game Reset and Restart**

To allow players to play multiple rounds, we’ve included a `resetGame` function that resets all relevant game state variables, generates a new word, and prepares the game for another round. It also ensures the game interface is ready for the new round.

```typescript
const resetGame = () => {
  setWord(generateRandomWord());
  setAttempts([]);
  setCurrentGuess('');
  setIsGameOver(false);
  setIsGameWon(false);
  setLetterHistory({});
  setGuessHistory([]);
};
```

## 8. **Final Display (Win or Loss)**

At the end of each game, we display a message indicating whether the player won or lost. If the game is won, the message is styled with a green color; if the game is lost, it’s red.

```typescript
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
```

## Conclusion

Building this Wordle clone using React, TypeScript, and Framer Motion offers a comprehensive look at managing game state, handling user input, and creating an engaging UI. The use of animation makes the game more interactive, while TypeScript provides type safety and ensures code quality. With features like keyboard input handling, guess evaluation, and smooth UI transitions, this clone captures the spirit of the original Wordle game while adding a bit of modern flair.

If you're interested, feel free to check out the full code on my [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/wordle.tsx) or try the live demo on my [portfolio](https://www.leosarmento.com/interactive/games/wordle)!

---

### Improvement points

If you want to take this project further, you can:

- Add difficulty levels (e.g., different word lengths or fewer attempts).
- Implement a timer to challenge players.
- Track high scores across multiple rounds.

Happy coding and playing! 🎮

---
