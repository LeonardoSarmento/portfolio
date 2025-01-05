# Criando um Clone Divertido do Wordle com React, TypeScript e Motion

Criar um clone do Wordle é uma maneira divertida de testar suas habilidades em React, TypeScript e animação. Neste post, vou te mostrar como construir um jogo completo do Wordle usando React, TypeScript e bibliotecas como `motion` do Framer Motion, `shadcn/ui` para componentes e `faker` para gerar palavras aleatórias.

Este projeto é um ótimo exercício para gerenciar o estado do jogo, lidar com a entrada do usuário e criar transições suaves na interface. Vamos mergulhar no código e em suas funcionalidades.

## 1. **Configurando a Estrutura do Jogo**

Começamos definindo a estrutura principal do nosso jogo:

- **Palavra a Ser Adivinhada**: Uma palavra aleatória de 5 letras gerada no início do jogo.
- **Palpites do Usuário**: O jogador tentará adivinhar a palavra, com um número limitado de tentativas (6 palpites).
- **Estado do Jogo**: Gerenciamos o estado do jogo com variáveis como `word`, `attempts`, `currentGuess` e `isGameOver` para acompanhar o progresso do jogador.

## 2. **Gerenciamento de Estado**

O jogo depende fortemente do estado do React para rastrear os principais elementos:

- `word`: A palavra secreta a ser adivinhada, gerada aleatoriamente no início.
- `attempts`: Armazena os palpites feitos pelo jogador até o momento.
- `currentGuess`: O palpite atual do jogador.
- `isGameOver` & `isGameWon`: Flags para determinar se o jogo acabou ou foi vencido.
- `letterHistory`: Acompanha o status de cada letra (correta, incorreta ou fora de lugar).
- `guessHistory`: Armazena o resultado de cada palpite (verde, amarelo, vermelho).

Aqui está como o estado é gerenciado usando o hook `useState` do React:

```typescript
const [word, setWord] = useState(generateRandomWord());
const [attempts, setAttempts] = useState<string[]>([]);
const [currentGuess, setCurrentGuess] = useState<string>('');
const [isGameOver, setIsGameOver] = useState(false);
const [isGameWon, setIsGameWon] = useState(false);
const [letterHistory, setLetterHistory] = useState<Record<string, string>>({});
const [guessHistory, setGuessHistory] = useState<string[][]>([]);
```

## 3. **Lidando com a Entrada do Usuário**

O jogo escuta a entrada do teclado para gerenciar os palpites. Lidamos com três tipos de entrada:

- **Teclas de letra**: Adiciona uma letra ao `currentGuess` se o jogador ainda não tiver adivinhado todas as letras.
- **Backspace**: Deleta o último caractere do `currentGuess`.
- **Enter**: Envia o palpite atual e aciona a avaliação.

Aqui está como a entrada do teclado é gerenciada:

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

## 4. **Lógica de Avaliação de Palpite**

Cada vez que o usuário envia um palpite, avaliamos com base nas seguintes regras:

- **Verde**: A letra está correta e na posição correta.
- **Amarelo**: A letra está na palavra, mas na posição errada.
- **Vermelho**: A letra não está na palavra.

Aqui está como avaliamos cada palpite:

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

## 5. **Animando a UI com Framer Motion**

Para melhorar a experiência do usuário, usamos os componentes `motion` do Framer Motion para animar a interface. Por exemplo, cada célula da letra na grade tem uma animação suave quando é revelada, escalando de um tamanho menor para o tamanho completo.

Aqui está como a animação é aplicada a cada palpite:

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

Usamos animações semelhantes para exibir as mensagens de vitória ou derrota após o fim do jogo, com o texto aparecendo suavemente para dar feedback ao jogador.

## 6. **Renderizando o Teclado Virtual**

O teclado virtual é composto por botões para cada letra do alfabeto. Quando o jogador clica em uma letra, ela é adicionada ao `currentGuess`. As cores dos botões mudam dinamicamente com base no status da letra (verde, amarelo, vermelho).

Aqui está o código para renderizar o teclado:

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

## 7. **Reiniciando o Jogo**

Para permitir que os jogadores joguem várias rodadas, incluímos uma função `resetGame` que redefine todas as variáveis de estado relevantes, gera uma nova palavra e prepara o jogo para outra rodada. Ela também garante que a interface do jogo esteja pronta para a nova rodada.

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

## 8. **Exibição Final (Vitória ou Derrota)**

Ao final de cada jogo, exibimos uma mensagem indicando se o jogador venceu ou perdeu. Se o jogo foi vencido, a mensagem é estilizada com uma cor verde; se o jogo foi perdido, é vermelha.

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

## Conclusão

Criar este clone do Wordle usando React, TypeScript e Framer Motion oferece uma visão abrangente sobre como gerenciar o estado do jogo, lidar com a entrada do usuário e criar uma interface envolvente. O uso de animações torna o jogo mais interativo, enquanto o TypeScript fornece segurança de tipos e garante a qualidade do código. Com recursos como o manuseio de entrada de teclado, avaliação de palpites e transições suaves na interface, este clone captura o espírito do jogo original, ao mesmo tempo em que adiciona um toque moderno.

Se você se interessou, fique à vontade para conferir o código completo no meu [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/wordle.tsx) ou experimentar a demonstração ao vivo no meu [portfolio](https://www.leosarmento.com/interactive/games/wordle)!

---

### Pontos de Melhoria

Se quiser levar este projeto mais longe, você pode:

- Adicionar níveis de dificuldade (por exemplo, diferentes tamanhos de palavras ou menos tentativas).
- Implementar um cronômetro para desafiar os jogadores.
- Rastrear os melhores resultados em várias rodadas.

Feliz codificação e diversão! 🎮

---
