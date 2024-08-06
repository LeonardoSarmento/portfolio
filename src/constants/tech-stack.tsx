import { FolderClock } from 'lucide-react';
import { MdArchitecture, MdPattern } from 'react-icons/md';
import { SlCloudDownload } from 'react-icons/sl';
import {
  SiAmazonec2,
  SiAutocad,
  SiAutodesk,
  SiAutodeskrevit,
  SiAxios,
  SiBluetooth,
  SiExpo,
  SiMicrosoft,
  SiMicrosoftazure,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiRedux,
  SiSqlite,
  SiTypescript,
  SiZod,
} from 'react-icons/si';
import { VscJson, VscProject } from 'react-icons/vsc';
import { TechStackType } from '@services/types/TechStack';

export const TECH_STACK: TechStackType = {
  frontend: [
    { title: 'Typescript', icon: <SiTypescript size={20} />, url: 'https://www.typescriptlang.org/' },
    { title: 'React', icon: <SiReact size={20} />, url: 'https://react.dev/' },
    {
      title: 'Tanstack Query',
      icon: <SiReactquery size={20} />,
      url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
    },
    {
      title: 'Tanstack Router',
      icon: <SiReactquery size={20} />,
      url: 'https://tanstack.com/router/latest/docs/framework/react/overview',
    },
    { title: 'React Hook Form', icon: <SiReacthookform size={20} />, url: 'https://www.react-hook-form.com/' },
    { title: 'Zod', icon: <SiZod size={20} />, url: 'https://zod.dev/' },
    { title: 'Axios', icon: <SiAxios size={20} />, url: 'https://axios-http.com/docs/intro' },
    { title: 'Redux Toolkit', icon: <SiRedux size={20} />, url: 'https://redux-toolkit.js.org/' },
  ],
  backend: [
    { title: 'SQLite', icon: <SiSqlite size={20} />, url: 'https://www.sqlite.org/' },
    { title: 'TypeORM', icon: <VscJson size={20} />, url: 'https://typeorm.io/' },
  ],
  mobile: [
    { title: 'Expo', icon: <SiExpo size={20} />, url: 'https://docs.expo.dev/' },
    { title: 'React Native', icon: <SiReact size={20} />, url: 'https://reactnative.dev/' },
    {
      title: 'react-native-ble-plx',
      icon: <SiBluetooth size={20} />,
      url: 'https://github.com/dotintent/react-native-ble-plx',
    },
  ],
  softskill: [{ title: 'Metodologia Ágil', icon: <FolderClock size={20} />, url: 'https://agilemanifesto.org/' }],
  education: [
    [
      { title: 'Amazon EC2', icon: <SiAmazonec2 size={20} />, url: 'https://aws.amazon.com/pt/ec2/' },
      { title: 'Azure', icon: <SiMicrosoftazure size={20} />, url: 'https://azure.microsoft.com/en-us' },
      {
        title: 'Solutions Architecture',
        icon: <SlCloudDownload size={20} />,
        url: 'https://learn.microsoft.com/en-us/collections/m14nt48x3r35jp',
      },
      {
        title: 'Software Architecture',
        icon: <MdArchitecture size={20} />,
        url: 'https://roadmap.sh/software-architect',
      },
      { title: 'Design Patterns', icon: <MdPattern size={20} />, url: 'https://refactoring.guru/design-patterns' },
      {
        title: 'Project Management',
        icon: <VscProject size={20} />,
        url: 'https://fia.com.br/blog/gestao-de-projetos/',
      },
    ],
    [
      {
        title: 'Revit',
        icon: <SiAutodeskrevit size={20} />,
        url: 'https://www.autodesk.com/br/products/revit/architecture',
      },
      { title: 'AutoCad', icon: <SiAutocad size={20} />, url: 'https://www.autodesk.com/br/products/autocad/overview' },
      {
        title: 'AutoDesk',
        icon: <SiAutodesk size={20} />,
        url: 'https://learn.microsoft.com/en-us/collections/m14nt48x3r35jp',
      },
      { title: 'Office 365', icon: <SiMicrosoft size={20} />, url: 'https://www.autodesk.com/' },
    ],
  ],
  profissional: [
    [
      { title: 'Typescript', icon: <SiTypescript size={20} />, url: 'https://agilemanifesto.org/' },
      { title: 'React', icon: <SiReact size={20} />, url: 'https://agilemanifesto.org/' },
      {
        title: 'Tanstack Query',
        icon: <SiReactquery size={20} />,
        url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
      },
      {
        title: 'Tanstack Router',
        icon: <SiReactquery size={20} />,
        url: 'https://tanstack.com/router/latest/docs/framework/react/overview',
      },
      { title: 'React Hook Form', icon: <SiReacthookform size={20} />, url: 'https://www.react-hook-form.com/' },
      { title: 'Zod', icon: <SiZod size={20} />, url: 'https://zod.dev/' },
      { title: 'Expo', icon: <SiExpo size={20} />, url: 'https://docs.expo.dev/' },
      { title: 'React Native', icon: <SiReact size={20} />, url: 'https://reactnative.dev/' },
      {
        title: 'react-native-ble-plx',
        icon: <SiBluetooth size={20} />,
        url: 'https://github.com/dotintent/react-native-ble-plx',
      },
      { title: 'SQLite', icon: <SiSqlite size={20} />, url: 'https://www.sqlite.org/' },
      { title: 'TypeORM', icon: <VscJson size={20} />, url: 'https://typeorm.io/' },
    ],
    [
      { title: 'Typescript', icon: <SiTypescript size={20} />, url: 'https://agilemanifesto.org/' },
      { title: 'React', icon: <SiReact size={20} />, url: 'https://agilemanifesto.org/' },
      {
        title: 'Tanstack Query',
        icon: <SiReactquery size={20} />,
        url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
      },
      { title: 'React Hook Form', icon: <SiReacthookform size={20} />, url: 'https://www.react-hook-form.com/' },
      { title: 'Zod', icon: <SiZod size={20} />, url: 'https://zod.dev/' },
      { title: 'Redux Toolkit', icon: <SiRedux size={20} />, url: 'https://redux-toolkit.js.org/' },
      { title: 'Axios', icon: <SiAxios size={20} />, url: 'https://axios-http.com/docs/intro' },
      { title: 'Expo', icon: <SiExpo size={20} />, url: 'https://docs.expo.dev/' },
      { title: 'React Native', icon: <SiReact size={20} />, url: 'https://reactnative.dev/' },
      {
        title: 'react-native-ble-plx',
        icon: <SiBluetooth size={20} />,
        url: 'https://github.com/dotintent/react-native-ble-plx',
      },
    ],
  ],
};
