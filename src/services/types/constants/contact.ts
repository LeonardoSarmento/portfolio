import { TTypewriterWords } from "@components/ui/typewriter-effect";
import { TSocialMediaCard } from "../SocialMediaCard";

export type TContactPage = {
  title: string;
  description: string[];
  socialMedia: { title: string; content: TSocialMediaCard[] };
  content: { title: string; src: string; alt: string };
  sideContent: { src: string; alt: string; content: { typewriter: TTypewriterWords; title: string } };
};
