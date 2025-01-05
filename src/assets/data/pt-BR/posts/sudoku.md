# Construindo um Jogo de Sudoku com TypeScript e React

O Sudoku é um jogo de quebra-cabeça clássico que desafia os jogadores com lógica e posicionamento de números. Para o meu último projeto, decidi criar um jogo de Sudoku interativo usando TypeScript, React e componentes de animação para transições suaves. Aqui está uma visão geral de como eu o construí e algumas das principais características.

## Características do Jogo

O jogo de Sudoku que desenvolvi inclui as seguintes características:

- **Grade Dinâmica**: A grade do jogo é 9x9, com números variando de 1 a 9. Os jogadores podem preencher as células vazias com base nas regras do Sudoku, garantindo que cada número apareça apenas uma vez em cada linha, coluna e subgrade 3x3.
- **Tratamento de Entrada Inválida**: Quando os jogadores inserem um número inválido, a célula fica vermelha, e um contador de erros aumenta. O jogo limita o jogador a três entradas incorretas antes de terminar.
- **Controles por Teclado e Botões**: Os jogadores podem clicar em uma célula e inserir um número usando os botões na tela ou usar o teclado para preencher os números e navegar pela grade.
- **Fim de Jogo e Reinício**: Se o jogador atingir o limite de erros, o jogo termina, e ele pode reiniciar com um novo quebra-cabeça.

## Destaques Técnicos

- **Gerenciamento de Estado**: O jogo utiliza o `useState` do React para gerenciar o estado da grade, incluindo os valores de cada célula, se a célula está fixa ou não, e se está inválida.
- **Animações com Motion**: Para tornar a experiência mais visualmente envolvente, usei o Framer Motion para animar os valores das células e transições, especialmente ao selecionar ou inserir um número.
- **Inicialização e Validação da Grade**: A grade é inicializada com um conjunto de números fixos posicionados aleatoriamente, enquanto o jogador preenche o restante. A entrada é validada verificando a linha, coluna e subgrade para garantir que as regras do Sudoku sejam seguidas.
- **Lógica do Jogo**: O jogo acompanha os erros do jogador e garante que a grade seja verificada para uma vitória após cada entrada. O jogo termina quando o jogador preenche a grade corretamente ou excede o limite de erros.

## Trecho de Código Principal

Aqui está um exemplo da lógica que trata a validação da entrada de números e contagem de erros:

```typescript
const handleNumberInput = (num: number) => {
  if (!selectedCell || gameOver) return;

  const { row, col } = selectedCell;

  // Impede a entrada se a célula selecionada for fixa
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

      // Se estava anteriormente inválido, NÃO decrementa a contagem de erros
      if (wasInvalid) {
        const cellKey = `${row}-${col}`;
        if (previousInvalidCells.current.has(cellKey)) {
          previousInvalidCells.current.delete(cellKey);
        }
      }
    } else {
      currentCell.value = num;
      currentCell.isInvalid = true;

      // Se não estava anteriormente inválido, aumenta a contagem de erros
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

## Experiência do Usuário

A interface do jogo é limpa e intuitiva. Os jogadores podem selecionar células clicando nelas, e o contador de erros é exibido, juntamente com uma mensagem caso eles percam o jogo. A grade é interativa, e os jogadores podem usar tanto o mouse quanto o teclado para inserir os números.

- **Botões de Números na Tela**: Criei um conjunto de botões representando os números de 1 a 9, permitindo que os jogadores cliquem em um número para preencher uma célula. O estilo do botão muda ao passar o mouse para fornecer feedback visual.
- **Grade Interativa**: Cada célula é clicável e anima ao ser selecionada, tornando claro qual célula está sendo editada. As entradas inválidas são destacadas em vermelho.

## Conclusão

Construir este jogo de Sudoku foi um desafio empolgante, pois combinou o gerenciamento de estado do React com lógica de jogo e animações suaves de interface. Foi um projeto divertido para aprimorar minhas habilidades em TypeScript, React e animação, e estou ansioso para expandir o projeto no futuro, adicionando recursos como níveis de dificuldade ou um cronômetro.

Se você se interessou, fique à vontade para conferir o código completo no meu [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/sudoku.tsx) ou experimentar a demonstração ao vivo no meu [portfolio](https://www.leosarmento.com/interactive/games/sudoku)

---
