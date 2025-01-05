# Criando um Jogo da Velha em TypeScript: Uma Combinação de Simplicidade e Animação

Neste post, vou te mostrar como criei um jogo da velha usando **TypeScript**, **shadcn/ui** e **Framer Motion**. O foco aqui está nas bibliotecas utilizadas para construir a interface, tornando a experiência do usuário tanto interativa quanto suave.

## Configurando o Jogo com TypeScript

O TypeScript fornece uma estrutura robusta para o nosso jogo, garantindo segurança de tipos e tornando o desenvolvimento mais suave. Com TypeScript, defini claramente o estado e os tipos, como para o tabuleiro, cujas células podem conter `'X'`, `'O'` ou `null`, e para acompanhar o estado do jogo, incluindo a vez do jogador e o vencedor.

```typescript
const [board, setBoard] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
```

O uso da tipagem estrita do TypeScript e a definição explícita das variáveis ajudaram a evitar erros comuns, tornando o processo de desenvolvimento mais previsível e fácil de manter.

## Construindo a Interface com shadcn/ui

A UI do jogo foi construída usando **shadcn/ui**, uma biblioteca leve de componentes de interface. Ela me permitiu implementar rapidamente botões e cartões com um visual moderno, com o mínimo de esforço.

Por exemplo, os botões de ação do jogo, como "Jogador vs Jogador" e "IA Fácil", são estilizados usando o componente `Button` do `shadcn/ui`. Os botões mudam de cor com base no modo de jogo selecionado, fornecendo feedback visual para os usuários.

```tsx
<Button
  onClick={() => startGame('Player')}
  className={`px-4 py-2 ${gameMode === 'Player' ? 'bg-green-500 text-white' : ''}`}
>
  Jogador vs Jogador
</Button>
```

Essa abordagem limpa e declarativa ajudou a manter uma aparência consistente em todo o aplicativo.

## Adicionando Transições Suaves com Framer Motion

Um dos destaques deste jogo é as transições suaves proporcionadas pelo **Framer Motion**. Sempre que um jogador interage com o jogo, as células do tabuleiro animam, proporcionando uma sensação dinâmica. Isso foi especialmente importante para mim, para aprimorar a experiência do usuário e tornar o jogo visualmente atraente.

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

O `motion.div` do Framer Motion foi usado para animar as células do tabuleiro, tornando o jogo mais interativo. Além disso, quando um jogador faz uma jogada, o resultado do jogo (seja um vencedor ou um empate) aparece suavemente com uma animação, proporcionando um visual polido.

## Finalizando

Combinando **TypeScript**, **shadcn/ui** e **Framer Motion**, consegui criar um jogo da velha que não é apenas funcional, mas também visualmente atraente e suave para interagir. Essas bibliotecas trabalharam juntas de forma perfeita, permitindo que eu focasse na mecânica do jogo e na experiência do usuário sem me preocupar com a complexidade da interface.

Este projeto é um exemplo perfeito de como as ferramentas modernas de desenvolvimento web podem se unir para criar uma experiência simples, mas envolvente.

Se você se interessou, fique à vontade para conferir o código completo no meu [GitHub](https://github.com/LeonardoSarmento/portfolio/blob/main/src/routes/interactive/games/tic-tac-toe.tsx) ou experimentar a demonstração ao vivo no meu [portfolio](https://www.leosarmento.com/interactive/games/tic-tac-toe)

---
