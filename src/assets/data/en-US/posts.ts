import DevelopingThePortfolio from '@assets/data/en-US/posts/developingThePortfolio.md';
import MultipleSSHPost from '@assets/data/en-US/posts/multipleSSH.md';
import I18nPost from '@assets/data/en-US/posts/i18n.md';
import Game2048 from '@assets/data/en-US/posts/2048.md';
import GameHangman from '@assets/data/en-US/posts/hangman.md';
import GameMinesweeper from '@assets/data/en-US/posts/minesweeper.md';
import GameSnake from '@assets/data/en-US/posts/snake.md';
import GameSukodu from '@assets/data/en-US/posts/sudoku.md';
import GameTicTacToe from '@assets/data/en-US/posts/tic-tac-toe.md';
import GameWordle from '@assets/data/en-US/posts/wordle.md';
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

export const posts_en_us: PublicationType[] = [
  {
    id: 'developing-the-portfolio',
    thumbnail: PORTFOLIO_TN,
    date: new Date('August 29, 2024 11:13:00'),
    title: 'Welcome to my portfolio',
    description: `A conversation about what's here on this site`,
    body: DevelopingThePortfolio,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[3]],
    file: null,
  },
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK2oSg0yJi5UptCnS36zQO49TwhEXgeIqNAYoB',
    date: new Date('August 30, 2024 19:35:00'),
    title: 'Two SSH github account configuration.',
    description: `I'll show you how I manage my personal and work profiles with SSH keys.`,
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[2], TAGS_OPTIONS_POSTS[4]],
    file: null,
  },
  {
    id: 'configuring-i18n',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKXEL6P8zHc0gvrkVfbGUZM5Fd98KeauQCP3zA',
    date: new Date('August 31, 2024 21:54:00'),
    title: 'I18n and its configurations',
    description: 'How to configure i18n in your React project with type safety and its applications.',
    body: I18nPost,
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[1], TAGS_OPTIONS_POSTS[5]],
    file: null,
  },
  {
    id: '2048',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKc6ixSsyBIMESgOKyLxqZ1pkrXN5VR7jbQTlC',
    date: new Date('December 17, 2024 23:37:45'),
    title: '2048: The Ultimate Tile-Twisting Challenge!',
    description: 'Slide and merge tiles to reach the elusive 2048 tile.',
    body: Game2048,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'hangman',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKr4Jg8RvaR62Mwfxp9UlKXJ5d1bYmFZByDk4V',
    date: new Date('December 18, 2024 11:08:13'),
    title: 'Hangman: Guess the Word Before Time Runs Out!',
    description: 'Guess the word before running out of attempts.',
    body: GameHangman,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'minesweeper',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKBimkVdbtCfpPhM0T7qc81dr3LHXK4u9SsvZ6',
    date: new Date('December 19, 2024 15:10:57'),
    title: 'Minesweeper: Can You Defuse the Danger?',
    description: 'Find all the mines without detonating them.',
    body: GameMinesweeper,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'snake',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLK0sCjhBNC5B20jYShq8QzmTFkfeoMtDgZirnL',
    date: new Date('December 21, 2024 15:43:45'),
    title: 'Snake: Slither Your Way to Victory!',
    description: 'Eat, grow, and avoid hitting the walls!',
    body: GameSnake,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'sudoku',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKmOKw9DQ924TL6RIuMXvzfcC1EaSOWdJKgoFw',
    date: new Date('December 23, 2024 17:07:24'),
    title: 'Sudoku: The Number Puzzle That Never Gets Old!',
    description: 'Solve challenging puzzles with logic and skill.',
    body: GameSukodu,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'tic-tac-toe',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKsRdSCYmKzCo4yESsZT05Jeu9HnOdlAtVxvLa',
    date: new Date('December 26, 2024 22:31:07'),
    title: 'Tic Tac Toe: Classic Fun, Endless Strategy!',
    description: 'Outsmart your opponent in this timeless classic.',
    body: GameTicTacToe,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
  {
    id: 'wordle',
    thumbnail: 'https://utfs.io/f/7UcJCClPcgLKjvLScwgimR2ON6k0MCIJVld7Y4pK9BGh3Urw',
    date: new Date('December 27, 2024 23:12:41'),
    title: 'Wordle: Guess the Word and Show Off Your Smarts!',
    description: 'Guess the 5-letter word in six attempts or less.',
    body: GameWordle,
    tags: [TAGS_OPTIONS_POSTS[6]],
    file: null,
  },
];
