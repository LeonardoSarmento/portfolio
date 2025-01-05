# Building a Sudoku Game with TypeScript and React

Sudoku is a classic puzzle game that challenges players with logic and number placement. For my latest project, I decided to create an interactive Sudoku game using TypeScript, React, and motion components for smooth transitions. Here’s a breakdown of how I built it and some key features.

## Game Features

The Sudoku game I developed includes the following features:

- **Dynamic Grid**: The game grid is 9x9, with numbers ranging from 1 to 9. Players can fill in the empty cells based on Sudoku rules, ensuring each number appears only once in each row, column, and 3x3 subgrid.
- **Invalid Input Handling**: When players enter an invalid number, the cell turns red, and an error counter increases. The game limits the player to three incorrect entries before ending.
- **Keyboard and Button Controls**: Players can either click on a cell and input a number using on-screen buttons or use the keyboard to fill in numbers and navigate through the grid.
- **Game Over and Restart**: If the player reaches the error limit, the game ends, and they can restart with a new puzzle.

## Technical Highlights

- **State Management**: The game uses React’s `useState` to manage the grid’s state, including the values in each cell, whether a cell is fixed or not, and if it’s invalid.
- **Motion for Animations**: To make the experience more visually engaging, I used Framer Motion to animate the cell values and transitions, especially when selecting or entering a number.
- **Grid Initialization and Validation**: The grid is initialized with a set of fixed numbers placed at random positions, while the player fills in the rest. Input is validated by checking the row, column, and subgrid to ensure the rules of Sudoku are followed.
- **Game Logic**: The game tracks the player’s errors and ensures the grid is checked for a win after every input. The game ends when the player fills the grid correctly or exceeds the error limit.

## Key Code Snippet

Here's an example of the logic that handles number input validation and error counting:

```typescript
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

    if (errorCountRef.current >= MAX_ERRORS) {
      setGameOver(true);
    }

    return newGrid;
  });
};
```

## User Experience

The game interface is clean and intuitive. Players can select cells by clicking on them, and the error count is displayed, along with a message if they lose the game. The grid is interactive, and players can use both mouse and keyboard for input.

- **On-Screen Number Buttons**: I created a set of buttons representing the numbers 1–9, allowing players to click a number to fill in a cell. The button style changes on hover to provide visual feedback.
- **Interactive Grid**: Each cell is clickable and animates upon selection, making it clear which cell is being edited. Invalid entries are highlighted in red.

## Conclusion

Building this Sudoku game was an exciting challenge, as it combined React state management with game logic and smooth UI animations. It was a fun project to enhance my skills in TypeScript, React, and animation, and I look forward to expanding on it in the future, adding features like difficulty levels or a timer.

If you're interested, feel free to check out the full code on my [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/sudoku.tsx) or try the live demo on my [portfolio](https://www.leosarmento.com/interactive/games/sudoku)

---
