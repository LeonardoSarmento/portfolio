# Creating a Tic Tac Toe Game in TypeScript: A Blend of Simplicity and Motion

In this blog post, I’ll walk you through the creation of a Tic Tac Toe game using **TypeScript**, **shadcn/ui**, and **Framer Motion**. The focus here is on the libraries used to build the interface, making the user experience both interactive and smooth.

## Setting Up the Game with TypeScript

TypeScript provides a robust structure to our game, ensuring type safety and making development smoother. With TypeScript, I defined the state and types clearly, such as for the board, whose cells can either hold `'X'`, `'O'`, or `null`, and for tracking the game's state, including the current player’s turn and the winner.

```typescript
const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
```

Using TypeScript’s strict typing and explicit variable definitions helped avoid common bugs, making the development process more predictable and maintainable.

## Building the Interface with shadcn/ui

The UI of the game is built using **shadcn/ui**, a lightweight UI component library. It allowed me to quickly implement modern-looking buttons and cards with minimal effort.

For example, the game’s action buttons, like "Player vs Player" and "AI Easy," are styled using the `Button` component from `shadcn/ui`. The buttons change color based on the selected game mode, providing visual feedback to users.

```tsx
<Button
  onClick={() => startGame('Player')}
  className={`px-4 py-2 ${gameMode === 'Player' ? 'bg-green-500 text-white' : ''}`}
>
  Player vs Player
</Button>
```

This clean, declarative approach helped maintain a consistent look and feel throughout the app.

## Adding Smooth Transitions with Framer Motion

One of the highlights of this game is the smooth transitions powered by **Framer Motion**. Every time a player interacts with the game, the board cells animate, providing a dynamic feel. This was especially important for me to enhance the user experience and make the game visually appealing.

```tsx
<motion.div
  key={index}
  className="hover:bg-muted flex h-20 w-20 items-center justify-center rounded-lg border border-gray-300"
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
```

Framer Motion’s `motion.div` was used to animate the board’s cells, making the game feel more interactive. Additionally, when a player makes a move, the game’s result (either a winner or a draw) fades in with a smooth animation, providing a polished look.

## Wrapping It All Up

By combining **TypeScript**, **shadcn/ui**, and **Framer Motion**, I was able to create a Tic Tac Toe game that is not only functional but also visually appealing and smooth to interact with. These libraries worked together seamlessly, allowing me to focus on the game mechanics and user experience without getting bogged down by UI complexity.

This project is a perfect example of how modern web development tools can come together to create a simple yet engaging experience.

If you're interested, feel free to check out the full code on my [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/tic-tac-toe.tsx) or try the live demo on my [portfolio](https://www.leosarmento.com/interactive/games/tic-tac-toe)

---
