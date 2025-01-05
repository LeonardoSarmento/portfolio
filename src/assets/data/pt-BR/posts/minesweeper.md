# **Construindo um Jogo da Campo Minado com React e TypeScript**

Campo Minado é um jogo clássico de quebra-cabeça onde os jogadores desvendam células em uma grade, tentando evitar minas enquanto deduzem suas localizações com base em pistas numéricas. Aqui está uma visão geral de como implementei o Campo Minado em uma aplicação React usando TypeScript, TailwindCSS, Framer Motion e as capacidades de gerenciamento de estado do React.

---

## **Características Principais da Implementação**

1. **Níveis de Dificuldade Dinâmicos**:

   - Os jogadores podem selecionar entre os níveis `Fácil`, `Médio` e `Difícil`, definidos por tamanho da grade e quantidade de minas.
   - A seleção de dificuldade atualiza dinamicamente a configuração do jogo.

2. **Gerenciamento de Estado**:

   - Utilize o `useSessionStorage` para persistir o estado, como o tabuleiro, pontuação atual, status do jogo e dificuldade selecionada.
   - Usei o `React.useState` para lidar com o estado efêmero, como animações e inicialização do jogo.

3. **Mecânica Central do Jogo**:

   - **Inicialização do Tabuleiro**: Criei uma matriz 2D para representar o tabuleiro, com minas colocadas aleatoriamente.
   - **Interações com as Células**: Gerenciei ações de clique esquerdo (revelar célula) e clique direito (alternar bandeira).
   - **Lógica do Jogo**:
     - Revela automaticamente as células adjacentes vazias quando uma célula com zero adjacente é clicada.
     - Acompanha o status do jogo (vitória/perda) e atualiza o estado conforme necessário.

4. **Animações**:

   - Usei o `Framer Motion` para melhorar a experiência do usuário com animações para explosões ao final do jogo e comemorações de vitória.

5. **Estilização**:
   - Usei o TailwindCSS para um design de UI responsivo e limpo, garantindo uma interface polida para o usuário.

---

## **Explicação do Código**

### **Tipos para o Tabuleiro do Jogo**

Para garantir segurança de tipo, defini os tipos `Cell` e `Difficulty`:

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

### **Níveis de Dificuldade Dinâmicos**

Os níveis de dificuldade foram definidos usando um objeto constante:

```typescript
const DIFFICULTIES: Record<string, Difficulty> = {
  Easy: { rows: 8, cols: 8, mines: 10 },
  Medium: { rows: 16, cols: 16, mines: 40 },
  Hard: { rows: 16, cols: 30, mines: 99 },
};
```

### **Inicialização do Tabuleiro**

A função `initializeBoard` configura a grade, coloca as minas e calcula as contagens de minas adjacentes:

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

#### **Lógica Central de Interação com as Células**

Tratando as ações de clique esquerdo para revelar células e clique direito para marcar bandeiras:

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

### **Condições de Vitória e Derrota**

Verificando se todas as células não-minadas foram reveladas:

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

## **Melhorias Futuras**

- **Dificuldade Personalizada**: Permitir que os usuários definam seu próprio tamanho de grade e quantidade de minas.
- **Otimização para Celulares**: Melhorar a UI para uma melhor usabilidade em telas menores.

---

## Experimente

Se você estiver interessado, sinta-se à vontade para conferir o código completo no meu [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/minesweeper.tsx) ou experimentar a demonstração ao vivo no meu [portfolio](https://www.leosarmento.com/interactive/games/minesweeper)!

---
