import DevelopingThePortfolio from '@assets/data/pt-BR//posts/developingThePortfolio.md';
import MultipleSSHPost from '@assets/data/pt-BR/posts/multipleSSH.md';
import I18nPost from '@assets/data/pt-BR/posts/i18n.md';
import Game2048 from '@assets/data/pt-BR/posts/2048.md';
import GameHangman from '@assets/data/pt-BR/posts/hangman.md';
import GameMinesweeper from '@assets/data/pt-BR/posts/minesweeper.md';
import GameSnake from '@assets/data/pt-BR/posts/snake.md';
import GameSukodu from '@assets/data/pt-BR/posts/sudoku.md';
import GameTicTacToe from '@assets/data/pt-BR/posts/tic-tac-toe.md';
import GameWordle from '@assets/data/pt-BR/posts/wordle.md';
import { TagType } from '@services/types/Tag';
import { PublicationType } from '@services/types/Publication';
import { TAGS_OPTIONS_POSTS } from '@constants/tags';
import { PORTFOLIO_TN } from '../thumbnails/links';

export type PostMenuNavigation = {
  id: string;
  thumbnail: string;
  date: Date;
  title: string;
  description: string;
  body: string;
  tags?: TagType[];
};

export const posts_pt_br: PublicationType[] = [
  {
    id: 'developing-the-portfolio',
    thumbnail: PORTFOLIO_TN,
    date: new Date('August 29, 2024 11:13:00'),
    title: 'Bem-vindo ao meu portifólio',
    description: 'Uma conversa sobre o que existe aqui nesse site',
    body: DevelopingThePortfolio,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3]],
    file: null,
  },
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK2oSg0yJi5UptCnS36zQO49TwhEXgeIqNAYoB',
    date: new Date('August 30, 2024 19:35:00'),
    title: 'Configurando duas chaves SSH para o Github',
    description: 'Te mostrar como gerencio meus perfis pessoal e de trabalho com chaves SSH.',
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[2], TAGS_OPTIONS_POSTS[4]],
    file: null,
  },
  {
    id: 'configuring-i18n',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKXEL6P8zHc0gvrkVfbGUZM5Fd98KeauQCP3zA',
    date: new Date('August 31, 2024 21:54:00'),
    title: 'I18n e suas configurações',
    description: 'Como configurar i18n no seu projeto React com tipagem e suas aplicações.',
    body: I18nPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[1], TAGS_OPTIONS_POSTS[5]],
    file: null,
  },
  {
    id: '2048',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKc6ixSsyBIMESgOKyLxqZ1pkrXN5VR7jbQTlC',
    date: new Date('December 17, 2024 23:37:45'),
    title: '2048: O Desafio Máximo de Quebra-Cabeça!',
    description: 'Deslize e mescle peças para alcançar a peça indescritível de 2048.',
    body: Game2048,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'hangman',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKr4Jg8RvaR62Mwfxp9UlKXJ5d1bYmFZByDk4V',
    date: new Date('December 18, 2024 11:08:13'),
    title: 'Forca: Adivinhe a Palavra Antes que o Tempo Acabe!',
    description: 'Adivinhe a palavra antes de ficar sem tentativas.',
    body: GameHangman,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'minesweeper',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKBimkVdbtCfpPhM0T7qc81dr3LHXK4u9SsvZ6',
    date: new Date('December 19, 2024 15:10:57'),
    title: 'Campo Minado: Você Consegue Desarmar o Perigo?',
    description: 'Encontre todas as minas sem detoná-las.',
    body: GameMinesweeper,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'snake',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK0sCjhBNC5B20jYShq8QzmTFkfeoMtDgZirnL',
    date: new Date('December 21, 2024 15:43:45'),
    title: 'Cobrinha: Deslize Rumo à Vitória!',
    description: 'Coma, cresça e evite bater nas paredes!',
    body: GameSnake,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'sudoku',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKmOKw9DQ924TL6RIuMXvzfcC1EaSOWdJKgoFw',
    date: new Date('December 23, 2024 17:07:24'),
    title: 'Sudoku: O Desafio Numérico Que Nunca Sai de Moda!',
    description: 'Resolva quebra-cabeças desafiadores com lógica e habilidade.',
    body: GameSukodu,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'tic-tac-toe',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKsRdSCYmKzCo4yESsZT05Jeu9HnOdlAtVxvLa',
    date: new Date('December 26, 2024 22:31:07'),
    title: 'Jogo da Velha: Diversão Clássica, Estratégia Sem Fim!',
    description: 'Supere seu oponente neste clássico jogo.',
    body: GameTicTacToe,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'wordle',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKjvLScwgimR2ON6k0MCIJVld7Y4pK9BGh3Urw',
    date: new Date('December 27, 2024 23:12:41'),
    title: 'Wordle: Adivinhe a Palavra e Mostre Seu Conhecimento!',
    description: 'Adivinhe a palavra de 5 letras em seis tentativas ou menos.',
    body: GameWordle,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
];
