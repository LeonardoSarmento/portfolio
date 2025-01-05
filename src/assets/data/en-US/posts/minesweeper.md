# **Building a Minesweeper Game with React and TypeScript**

Minesweeper is a classic puzzle game where players uncover cells on a grid, trying to avoid mines while deducing their locations based on numerical clues. Here’s an overview of how I implemented Minesweeper in a React application using TypeScript, TailwindCSS, Framer Motion, and React’s state management capabilities.

---

## **Key Features of the Implementation**

1. **Dynamic Difficulty Levels**:

   - Players can select between `Easy`, `Medium`, and `Hard` levels, each defined by grid size and mine count.
   - The difficulty selection dynamically updates the game configuration.

2. **State Management**:

   - Leveraged `useSessionStorage` to persist state such as the game board, current score, game status, and selected difficulty.
   - Used `React.useState` to handle ephemeral state like animations and game initialization.

3. **Core Game Mechanics**:

   - **Board Initialization**: Created a 2D array to represent the board, with mines placed randomly.
   - **Cell Interactions**: Handled left-click (reveal cell) and right-click (toggle flag) actions.
   - **Game Logic**:
     - Automatically reveals adjacent empty cells when a zero-adjacent cell is clicked.
     - Tracks game status (win/lose) and updates the state accordingly.

4. **Animations**:

   - Used `Framer Motion` to enhance user experience with animations for game-over explosions and win celebrations.

5. **Styling**:
   - Used TailwindCSS for responsive and clean UI design, ensuring a polished user interface.

---

## **Code Walkthrough**

### **Types for the Game Board**

To ensure type safety, I defined the `Cell` and `Difficulty` types:

```typescript
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
```

### **Dynamic Difficulty Levels**

Difficulty levels were defined using a constant object:

```typescript
const DIFFICULTIES: Record<string, Difficulty> = {
  Easy: { rows: 8, cols: 8, mines: 10 },
  Medium: { rows: 16, cols: 16, mines: 40 },
  Hard: { rows: 16, cols: 30, mines: 99 },
};
```

### **Board Initialization**

The `initializeBoard` function sets up the grid, places mines, and calculates adjacent mine counts:

```typescript
const initializeBoard = () => {
  const { rows, cols, mines } = difficulty;

  const newBoard: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })),
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!newBoard[row][col].isMine) {
      newBoard[row][col].isMine = true;
      minesPlaced++;
    }
  }

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
  setIsExploding(false);
};
```

#### **Core Cell Interaction Logic**

Handling left-click actions for revealing cells and right-click actions for flagging:

```typescript
const handleCellClick = (row: number, col: number) => {
  if (isGameOver || isWin || board[row][col].isFlagged || board[row][col].isRevealed) return;

  const newBoard = [...board];
  const cell = newBoard[row][col];

  if (cell.isMine) {
    setIsExploding(true);
    setTimeout(() => {
      setIsGameOver(true);
      revealBoard(newBoard);
      setScore(0);
    }, 1000);
  } else {
    revealCell(newBoard, row, col);
    checkWin(newBoard);
    setScore((prevScore) => prevScore + cell.adjacentMines);
  }

  setBoard(newBoard);
};
```

### **Win and Loss Conditions**

Checking if all non-mine cells are revealed:

```typescript
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
```

---

## **Future Enhancements**

- **Custom Difficulty**: Allow users to define their own grid size and mine count.
- **Mobile Optimization**: Enhance the UI for better usability on smaller screens.

---

## Try It Out

If you're interested, feel free to check out the full code on my [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/minesweeper.tsx) or try the live demo on my [portfolio](https://www.leosarmento.com/interactive/games/minesweeper)!

---
