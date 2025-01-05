### Construindo "Forca" com TypeScript: Um Jogo Clássico Reimaginado

O clássico jogo de adivinhação de palavras "Forca" foi reinventado usando tecnologias web modernas. Abaixo, exploro o processo de desenvolvimento, os desafios enfrentados e como incorporei interatividade e animações para elevar esse jogo atemporal.

---

### **Visão Geral do Jogo Forca**

Esta implementação do Forca é uma aplicação web construída com:

- **TypeScript**: Garante segurança de tipo e uma experiência aprimorada para o desenvolvedor.
- **React**: Oferece uma estrutura robusta para a construção de interfaces de usuário.
- **Framer Motion**: Adiciona animações suaves aos elementos do jogo.
- **Faker.js**: Gera palavras aleatórias para cada novo jogo.

O gameplay envolve adivinhar letras de uma palavra oculta dentro de um número definido de tentativas. As tentativas erradas desenham progressivamente uma figura de palito no andaime até que o jogador adivinhe a palavra ou perca o jogo.

---

### **Características Principais**

1. **Geração de Palavras Aleatórias**

   - Utiliza `faker.word.noun()` para gerar uma palavra aleatória para cada novo jogo, garantindo imprevisibilidade.

2. **Teclado Interativo**

   - Os jogadores podem adivinhar letras usando um teclado na tela ou input do teclado físico.
   - Os botões são desabilitados automaticamente após a seleção, melhorando o feedback do usuário.

3. **Renderização do Andaime**

   - Exibe um andaime visual que é atualizado dinamicamente com cada tentativa errada.
   - Utiliza um design em múltiplos estágios para imitar o andaime tradicional do jogo da forca.

4. **Feedback em Tempo Real**

   - A palavra adivinhada é atualizada dinamicamente, mostrando as letras corretamente adivinhadas e espaços para as letras restantes.
   - Acompanha e exibe o número de tentativas erradas, tornando as apostas claras para o jogador.

5. **Design Responsivo**

   - Construído com uma abordagem mobile-first, garantindo compatibilidade em diversos dispositivos.

6. **Animações**

   - Integra o `Framer Motion` para efeitos de escala e desvanecimento, aprimorando a experiência visual durante a jogabilidade e as mudanças de estado do jogo.

---

### **Desafios e Soluções**

- **Desafio**: Gerenciar as letras adivinhadas e lidar com entradas repetidas.

  - **Solução**: Utilizou a estrutura de dados `Set` para rastrear de maneira eficiente as letras adivinhadas e evitar duplicatas.

- **Desafio**: Resetar o estado do jogo enquanto mantém uma experiência limpa para o usuário.

  - **Solução**: Encapsulou a lógica do jogo em funções reutilizáveis e adicionou um botão de reset para reiniciar o jogo com sobrecarga mínima.

- **Desafio**: Lidar com animações sem prejudicar o desempenho.
  - **Solução**: Aproveitou a API leve e declarativa do Framer Motion para animar elementos do andaime e do texto de forma fluida.

---

### **Destaques do Código**

Aqui está um breve olhar sobre algumas partes críticas do código:

1. **Gerando a Palavra**:

   ```typescript
   const generateRandomWord = () => faker.word.noun().toLowerCase();
   ```

   Esta função garante que uma palavra nova seja gerada no início de cada novo jogo.

2. **Renderizando o Andaime**:

   ```typescript
   const renderScaffold = () => {
     const scaffoldStages = [
       // Array de arte ASCII para os estágios do andaime
     ];
     return scaffoldStages[wrongGuesses];
   };
   ```

   Fornece uma representação visual do progresso do jogo com base nas tentativas erradas.

3. **Tratando as Adivinhações**:

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

   Garante o manuseio eficiente da entrada do usuário, respeitando as regras do jogo.

---

### **Experimente**

Teste seu vocabulário e habilidades de dedução com este jogo interativo da Forca. Você consegue adivinhar a palavra antes que o andaime esteja completo?

Clique abaixo para começar a jogar:

[Jogar Forca](https://www.leosarmento.com/interactive/games/hangman)

Código completo no meu [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/hangman.tsx).

---
