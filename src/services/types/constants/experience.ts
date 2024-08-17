import { TechType } from "./tech-stack";

export type TExperienceStack = {
    title: string;
    description: string;
    stack: TechType[];
  };
  
  export type TExperienceContent = {
    experience: {
      title: string;
      description: string[];
      stack: TExperienceStack[];
    };
    education: {
      title: string;
      description: string[];
      stack: TTabsContent[];
    };
    professional: {
      title: string;
      description: string[];
      stack: TTabsContent[];
    };
  };
  
  
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