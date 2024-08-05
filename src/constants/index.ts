import { TSocialMediaCard } from "@services/types/SocialMediaCard";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export const SocialMediaItems: TSocialMediaCard[] = [
  { name: 'Instagram', icon: Instagram, link: 'https://instagram.com/leonardo.a.sarmento' },
  { name: 'Linkedin', icon: Linkedin, link: 'https://linkedin.com/in/leonardo-araujo-sarmento' },
  { name: 'Github', icon: Github, link: 'https://github.com/LeonardoSarmento' },
  { name: 'Gmail', icon: Mail, link: 'mailto: leonardo.a.sarmento@gmail.com?subject=ThisIsMyFeedback&body=Hello!' },
];
