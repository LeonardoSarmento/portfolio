import { ListItemType } from '@components/NavigationMenu';
import { LinkOptions } from '@tanstack/react-router';
import { PublicationType } from '../Publication';

export type TMenuContent = {
  about: {
    title: string;
    image: { src: string; alt: string };
    subtitle: string;
    description: string;
    path: LinkOptions;
  };
  options: ListItemType[];
  posts: {
    title: string;
    contents: PublicationType[];
    path: LinkOptions;
    items: ListItemType[];
  };
  interactives: {
    title: string;
    items: ListItemType[];
  };
};
