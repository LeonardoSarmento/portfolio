import DevelopingThePortfolio from '@assets/data/pt-BR//posts/developingThePortfolio.md';
import MultipleSSHPost from '@assets/data/pt-BR/posts/multipleSSH.md';
import I18nPost from '@assets/data/pt-BR/posts/i18n.md';
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
    tags: [TAGS_OPTIONS_POSTS[0], TAGS_OPTIONS_POSTS[1]],
    file: null,
  },
  {
    id: 'two-ssh-github-account-configuration',
    thumbnail: 'https://devconnected.com/wp-content/uploads/2019/10/featured-12.png',
    date: new Date('August 30, 2024 19:35:00'),
    title: 'Configurando duas chaves SSH para o Github',
    description: 'Te mostrar como gerencio meus perfis pessoal e de trabalho com chaves SSH.',
    body: MultipleSSHPost,
    tags: [TAGS_OPTIONS_POSTS[2], TAGS_OPTIONS_POSTS[3]],
    file: null,
  },
  {
    id: 'configuring-i18n',
    thumbnail: 'https://magepow.com/blog/wp-content/uploads/2021/03/42as4j86k92eqqi3z148d6l3ydij-1.png',
    date: new Date('August 31, 2024 21:54:00'),
    title: 'I18n e suas configurações',
    description: 'Como configurar i18n no seu projeto React com tipagem e suas aplicações.',
    body: I18nPost,
    tags: [TAGS_OPTIONS_POSTS[4], TAGS_OPTIONS_POSTS[5]],
    file: null,
  },
];
