import BlogPost from '@assets/data/markdown.md';

export type ProjectMenuNavigation = {
  id: string;
  image: string;
  date: Date;
  title: string;
  description: string;
  body: string;
};

export const projects: ProjectMenuNavigation[] = [
  {
    id: 'project-number-42',
    image:
      'https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2011/2/3/1296745175678/-The-Hitchhiker-s-Guide-t-008.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctYWdlLTIwMTEucG5n&enable=upscale&s=8f410dd0450b88bde569c9a5bc4fdc34',
    date: new Date(),
    title: 'Big project forty two trust it.',
    description: 'Description as response.',
    body: 'This should be markdown.',
  },
  {
    id: 'project-based-tanstack-router',
    image: 'https://repository-images.githubusercontent.com/165670309/c761731e-94c8-4ff0-a92d-3ef988d1a490',
    date: new Date(),
    title: 'Tanstack Router based project',
    description: 'Got no ideia.',
    body: BlogPost,
  },
];
