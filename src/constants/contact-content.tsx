import { TTypewriterWords } from '@components/ui/typewriter-effect';
import { TSocialMediaCard } from '@services/types/SocialMediaCard';
import { LEO_DIA_D, THUMBSUP } from '@services/utils/Images';
import { SocialMediaItems } from '.';

type TContactPage = {
  title: string;
  description: string[];
  socialMedia: { title: string; content: TSocialMediaCard[] };
  content: { title: string; src: string; alt: string };
  sideContent: { src: string; alt: string; content: { typewriter: TTypewriterWords; title: string } };
};

const words = [
  {
    text: '"',
  },
  {
    text: 'Dúvida com',
  },
  {
    text: 'o que gastar',
  },
  {
    text: 'o seu dinheiro?',
  },
  {
    text: 'Faz um pix pra mim :)',
    className: 'text-green-500 dark:text-green-500',
  },
  {
    text: '"',
  },
];

export const CONTACTCONTENT: TContactPage = {
  title: 'Contato',
  description: [
    'Caso queira me dar dinheiro, entre em contato pelas minhas redes sociais',
    'Se vc for o agiota, tente no site da concorrência!',
  ],
  socialMedia: { title: '', content: SocialMediaItems },
  content: {
    alt: 'thumbs up green emoji',
    src: THUMBSUP,
    title: 'Feito com muito carinho por Leonardo Araujo Sarmento',
  },
  sideContent: {
    src: LEO_DIA_D,
    alt: `Leonardo's photo at ISTEO 'D' day`,
    content: { typewriter: words, title: ' - eu' },
  },
};
