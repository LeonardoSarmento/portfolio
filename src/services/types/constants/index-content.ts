import { LinkOptions } from "@tanstack/react-router";
import { TTabsContent } from "./experience";
import { PublicationType } from "../Publication";

export type TCardContent = {
  about: {
    header: { src: string; alt: string; title: string; description: string };
    content: { description: string[] };
  };
  education: TTabsContent[];
  experience: TTabsContent[];
};

export type TCarrouselComponent = {
  title: string;
  description: string;
  publication?: PublicationType[];
  path: LinkOptions;
  buttonPath: LinkOptions;
  buttonTitle: string;
};
