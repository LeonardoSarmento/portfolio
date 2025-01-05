# Construindo um Jogo Clássico da Cobra com TypeScript e React

Como parte da minha jornada contínua de aprendizado, decidi recriar o clássico jogo da Cobra usando TypeScript e React. O objetivo era desenvolver uma experiência interativa simples, mas envolvente, com animações suaves e controles responsivos. Aqui está como eu construí o jogo e as principais características que deram vida ao projeto.

## Características do Jogo

O jogo da Cobra foi implementado utilizando as seguintes características:

- **Jogabilidade Baseada em Grade**: O tabuleiro do jogo consiste em uma grade 20x20, onde a cobra se move de maneira baseada em grades. A cada movimento, a posição da cobra é atualizada, a colisão é verificada e a alimentação da cobra é tratada.
- **Movimento da Cobra**: A cobra se move utilizando as setas do teclado. A lógica impede que a cobra se mova na direção oposta, criando uma experiência mais desafiadora.
- **Mecânica de Alimentação**: Toda vez que a cobra come a comida, seu comprimento aumenta e nova comida é gerada em uma posição aleatória na grade.
- **Fim de Jogo e Reinício**: O jogo termina se a cobra colidir consigo mesma, e os jogadores podem reiniciar ou pausar o jogo a qualquer momento.

## Destaques Técnicos

- **Gerenciamento de Estado**: Os hooks `useState` e `useEffect` do React foram essenciais para gerenciar o estado do jogo, incluindo a posição da cobra, o local da comida, a pontuação e o cronômetro.
- **Animações com Motion**: Usei o Framer Motion para criar transições suaves para a cobra e a comida na grade do jogo. Cada elemento é animado para melhorar o apelo visual e tornar a jogabilidade mais fluida.
- **Roteamento com TanStack Router**: Para navegação, integrei o TanStack Router para gerenciar as rotas do jogo dentro da aplicação maior.
- **Controles por Botões**: Implementei botões personalizados para iniciar, pausar e reiniciar o jogo usando os componentes do `shadcn/ui`. Os botões são desabilitados quando necessário para evitar ações conflitantes, como iniciar um novo jogo enquanto outro está em andamento.

## Experiência do Usuário

O jogo apresenta uma interface limpa e simples, onde os jogadores podem acompanhar sua pontuação e o tempo decorrido no topo. Os controles do jogo são intuitivos, com entrada via teclado para mover a cobra e botões na tela para controlar o fluxo do jogo.

#### Trecho de Código Principal

Aqui está um exemplo do loop principal do jogo, onde o movimento da cobra e a detecção de colisão são tratados:

```typescript
React.useEffect(() => {
  if (!isRunning || isPaused) return;

  const interval = setInterval(() => {
    if (gameOver || (nextDirection.x === 0 && nextDirection.y === 0)) return;

    setDirection(nextDirection);

    setSnake((prevSnake) => {
      const newHead = {
        x: (prevSnake[0].x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        setIsRunning(false);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        });
        setScore((prevScore) => prevScore + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, SPEED);

  return () => clearInterval(interval);
}, [nextDirection, food, gameOver, isRunning, isPaused]);
```

## Conclusão

Este projeto foi um ótimo exercício para aplicar React, TypeScript e bibliotecas de animação para criar um jogo divertido e interativo. Ele me ajudou a aprofundar meu entendimento sobre gerenciamento de estado e animações, além de aprimorar minhas habilidades de resolução de problemas ao lidar com a lógica do jogo. Se você tem interesse no desenvolvimento de jogos com React, recomendo fortemente tentar construir um projeto como este.

Se você se interessou, fique à vontade para conferir o código completo no meu [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/snake.tsx) ou experimentar a demonstração ao vivo no meu [portfolio](https://www.leosarmento.com/interactive/games/snake)

---
