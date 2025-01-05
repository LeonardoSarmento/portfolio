### Building "Hangman" with TypeScript: A Classic Game Reinvented

The classic word-guessing game "Hangman" has been reimagined using modern web technologies. Below, I dive into the development process, the challenges faced, and how I incorporated interactivity and animations to elevate this timeless game.

---

### **Overview of the Hangman Game**

This implementation of Hangman is a web-based application built with:

- **TypeScript**: Ensures type safety and enhanced developer experience.
- **React**: Provides a robust framework for building user interfaces.
- **Framer Motion**: Adds smooth animations to the game elements.
- **Faker.js**: Randomly generates words for each new game.

The gameplay involves guessing letters of a hidden word within a set number of attempts. Incorrect guesses progressively draw a stick figure on the scaffold until the player either guesses the word or loses the game.

---

### **Key Features**

1. **Random Word Generation**

   - Utilizes `faker.word.noun()` to generate a random word for each new game, ensuring unpredictability.

2. **Interactive Keyboard**

   - Players can guess letters using an on-screen keyboard or physical keyboard input.
   - Buttons disable automatically once selected, improving user feedback.

3. **Scaffold Rendering**

   - Displays a visual scaffold that updates dynamically with each incorrect guess.
   - Utilizes a multi-stage design to mimic the traditional Hangman scaffold.

4. **Real-Time Feedback**

   - The guessed word updates dynamically, showing correctly guessed letters and placeholders for remaining letters.
   - Tracks and displays the number of wrong guesses, making the stakes clear to the player.

5. **Responsive Design**

   - Built with a mobile-first approach, ensuring compatibility across devices.

6. **Animations**
   - Integrates `Framer Motion` for scaling and fade effects, enhancing the visual experience during gameplay and game state changes.

---

### **Challenges and Solutions**

- **Challenge**: Managing guessed letters and handling repeated inputs.

  - **Solution**: Utilized a `Set` data structure to efficiently track guessed letters and prevent duplicates.

- **Challenge**: Resetting the game state while maintaining a clean user experience.

  - **Solution**: Encapsulated game logic within reusable functions and added a reset button to restart the game with minimal overhead.

- **Challenge**: Handling animations without hindering performance.
  - **Solution**: Leveraged Framer Motion’s lightweight and declarative API to animate scaffold and text elements seamlessly.

---

### **Code Highlights**

Here’s a brief look at some critical parts of the code:

1. **Generating the Word**:

   ```typescript
   const generateRandomWord = () => faker.word.noun().toLowerCase();
   ```

   This function ensures that a fresh word is generated at the start of every new game.

2. **Scaffold Rendering**:

   ```typescript
   const renderScaffold = () => {
     const scaffoldStages = [
       // Array of ASCII art for scaffold stages
     ];
     return scaffoldStages[wrongGuesses];
   };
   ```

   Provides a visual representation of the game’s progress based on incorrect guesses.

3. **Handling Guesses**:

   ```typescript
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
   ```

   Ensures efficient handling of user input while adhering to game rules.

---

### **Try It Out**

Test your vocabulary and deduction skills with this interactive Hangman game. Can you guess the word before the scaffold is complete?

Click below to start playing:

[Play Hangman](https://www.leosarmento.com/interactive/games/hangman)

Full code on my [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/hangman.tsx).

---
