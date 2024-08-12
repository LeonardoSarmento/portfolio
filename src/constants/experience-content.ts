import { FAPES_LOGO, IEL_LOGO, UCL_LOGO } from '@services/utils/Images';
import { TECH_STACK } from './tech-stack';
import { TechType } from '@services/types/TechStack';

export type TExperienceContent = {
  title: string;
  description: string;
  stack: TechType[];
};

export const EXPERIENCECONTENT: TExperienceContent[] = [
  {
    title: 'Frontend',
    description:
      'Aplicações web feitas com gerenciamento de estados globais, formulários com validação e integração com REST APIs.',
    stack: TECH_STACK.frontend,
  },
  {
    title: 'Mobile',
    description:
      'Aplicações mobile que utilizam a conectividade bluetooth para coleta de dados. Sempre com mentalidade Offline-first para gerantia de persistência de dados.',
    stack: TECH_STACK.mobile,
  },
  {
    title: 'Backend',
    description:
      'Banco de dados e ORM utilizados para persistência de dados da aplicação mobile no celular do usuário.',
    stack: TECH_STACK.backend,
  },
  {
    title: 'Softskills',
    description:
      'Ao longo dos projetos tive a oportunidade desenvolver minha comunição, empatia, liderança, trabalho em equipe',
    stack: TECH_STACK.softskill,
  },
];

export type TTabsContent = {
  value: string;
  title: string;
  header: {
    avatar: { src: string; avatarFallback: string };
    title: string;
    description: string;
    content: { description: string[] };
  };
  learnings: { title: string; content: { description: string[] } };
  tools: { title: string; content: TechType[] };
};

export const TABSEDUCATIONAL: TTabsContent[] = [
  {
    value: 'postgraduate',
    title: 'Pós graduação',
    header: {
      avatar: { src: IEL_LOGO, avatarFallback: 'XP Educação logo' },
      title: 'XP Educação',
      description: '',
      content: {
        description: ['Postgraduate Degree, Software Architecture and Solutions', 'Nov 2023 - Set 2024'],
      },
    },
    learnings: {
      title: 'Aprendizados',
      content: {
        description: [
          `Specialized in software project lifecycle, focusing on project requirements, structuring, and management. Gained expertise in Software Architecture and Cloud-based Solutions Architecture.`,
        ],
      },
    },
    tools: { title: 'Ferramentas', content: TECH_STACK.education[0] },
  },
  {
    value: 'graduate',
    title: 'Graduação',
    header: {
      avatar: { src: UCL_LOGO, avatarFallback: 'Faculdade UCL logo' },
      title: 'Faculdade UCL',
      description: 'Faculdade do Centro Leste',
      content: {
        description: [
          'Bachelor of Engineering - BE, Engenharia Civil',
          'Feb 2014 - Aug 2021',
          'Serra, Espírito Santo, Brazil',
        ],
      },
    },
    learnings: {
      title: 'Aprendizados',
      content: {
        description: [
          `Development of activities related to all the stages of the concrete compressive strength test. Therefore, participation in the concreting of the client's site, carrying out the concrete slump test.`,
          `Demolding of specimens obtained during concreting at the client's site. Identification and storage of the specimens in the wet chamber.`,
          `Maintenance of the molds used in concreting, concrete compressive strength test, disposal of broken specimens and creation of the test certificate for each invoice.`,
        ],
      },
    },
    tools: { title: 'Ferramentas', content: TECH_STACK.education[1] },
  },
];
export const TABSPROFESSIONAL: TTabsContent[] = [
  {
    value: 'IEL',
    title: 'IEL',
    header: {
      avatar: { src: IEL_LOGO, avatarFallback: 'IEL - Bolsista' },
      title: 'IEL - Bolsista em Desenvolvimento de Software',
      description: 'ISTEO - Instituto SENAI de Tecnologia em Eficiência Operacional',
      content: { description: ['Feb 2024 - Present', 'Vitória, Espírito Santo, Brazil · Hybrid'] },
    },
    learnings: {
      title: 'Aprendizados',
      content: {
        description: [
          'Working on software development projects, focusing on the frontend.',
          '• Collaborated with a cross-functional team in an Agile environment to successfully deliver multiple software projects on time and within budget',
          '• Participated in calls with 4 companies, helping the development of 4 innovative projects and securing R$300K plus in funding.',
          '• Developing projects using React, React Native, TypeScript, Expo, React Query, Axios, Zod, React-hook-form, React-native-ble-plx, Redux Toolkit, REST API, BPMN and Agile Methodologies.',
        ],
      },
    },
    tools: { title: 'Ferramentas', content: TECH_STACK.profissional[0] },
  },
  {
    value: 'FAPES',
    title: 'FAPES',
    header: {
      avatar: { src: FAPES_LOGO, avatarFallback: 'FAPES - Bolsista' },
      title: 'FAPES - Bolsista em Desenvolvimento de Software',
      description: 'ISTEO - Instituto SENAI de Tecnologia em Eficiência Operacional',
      content: { description: ['Feb 2023 - Feb 2024 · 1 yr', 'Vitória, Espírito Santo, Brazil · Hybrid'] },
    },
    learnings: {
      title: 'Aprendizados',
      content: {
        description: [
          'Working on software development projects, focusing on the frontend.',
          '• Collaborated with a cross-functional team in an Agile environment to successfully deliver multiple software projects on time and within budget',
          '• Participated in calls with 4 companies, helping the development of 4 innovative projects and securing R$300K plus in funding.',
          '• Developing projects using React, React Native, TypeScript, Expo, React Query, Axios, Zod, React-hook-form, React-native-ble-plx, Redux Toolkit, REST API, BPMN and Agile Methodologies.',
        ],
      },
    },
    tools: { title: 'Ferramentas', content: TECH_STACK.profissional[1] },
  },
];
