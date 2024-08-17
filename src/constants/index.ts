import { TSocialMediaCard } from '@services/types/SocialMediaCard';
import { MY_PHOTO } from '@services/utils/Images';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { TCardContent, TCarrouselComponent } from '@services/types/constants/index-content';

export const SocialMediaItems: TSocialMediaCard[] = [
  { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/leonardo.a.sarmento' },
  { name: 'Linkedin', icon: Linkedin, link: 'https://linkedin.com/in/leonardo-araujo-sarmento' },
  { name: 'Github', icon: Github, link: 'https://github.com/LeonardoSarmento' },
  { name: 'Gmail', icon: Mail, link: 'mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!' },
];

export const ABOUTMECONTENT: TCardContent['about'] = {
  header: {
    alt: `Leonardo's photo`,
    src: MY_PHOTO,
    title: 'Leonardo',
    description: 'Front End Engineer | React | React Native | TypeScript | Agile',
  },
  content: {
    description: [
      `As a dedicated Virtual Systems Fellow at the SENAI Institute of Technology — Operational Efficiency, I have been actively developing web applications for various clients.`,
      `My expertise lies in using ReactJs, React Native, and TypeScript for frontend development and integrating REST APIs with Node.Js on the backend, always ensuring agility in my work. In my pursuit of specialization, I have embarked on postgraduate studies in Software Architecture and Solutions, with a keen focus on understanding the comprehensive Cloud environment.`,
      `Currently, I am honing my skills in React Native through a project targeted at industry professionals in occupational health and safety. This project involves capturing data via Bluetooth connection with various sensors, storing it in the application with an offline-first approach, and displaying the data through real-time graphs. The technologies I’m using include Expo, React Native, TypeScript, React-native-ble-plx, Redux-toolkit, React Query with Axios, React-hook-form, and Zod.`,
      `In addition, I have contributed to a health sector project, where we developed a management system for companies to analyze their employees’ mental health data. This involved creating a Progressive Web Application (PWA) for employees to manage their appointments, available clinics for consultations, and mental health forms. A separate website was also developed for the company and clinics to manage all their employees’ data, appointments, and forms.`,
    ],
  },
};
export const CARROUSELPARTIALOPTIONS: TCarrouselComponent[] = [
  {
    buttonPath: { to: '/posts', search: { page: '1', pageSize: '100' } },
    buttonTitle: 'Ver todos Posts',
    title: 'Posts',
    path: { to: '/posts/$postId' },
  },
  {
    buttonPath: { to: '/projects', search: { page: '1', pageSize: '100' } },
    buttonTitle: 'Ver todos Projects',
    title: 'Projects',
    path: { to: '/projects/$projectId' },
  },
];
