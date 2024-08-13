import { posts } from "@assets/data/posts";
import { PAGE_SIZE_OPTIONS } from "@components/FilterMenuComponent";
import { ListItemType } from "@components/NavigationMenu";
import { PostType } from "@services/types/Post";
import { MY_PHOTO } from "@services/utils/Images";
import { LinkOptions } from "@tanstack/react-router";
import { Contact, FolderGit2, GraduationCap, Handshake } from "lucide-react";

type TMenuContent = {
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
    contents: PostType[];
    path: LinkOptions;
    items: ListItemType[];
  };
};

export const MENUCONTENT: TMenuContent = {
  about: {
    title: 'About Me !',
    image: { src: MY_PHOTO, alt: `Leonardo's photo` },
    subtitle: 'Leonardo',
    description: 'Hi!, welcome to my portfolio. Be free to explore my site.',
    path: { to: '/' },
  },
  options: [
    {
      title: 'Introduction',
      to: '/introduction',
      icon: <Handshake size={16} />,
      children: `How I got here? Who I am? Come with me and i'll explain.`,
    },
    {
      title: 'Experience',
      to: '/experience',
      icon: <GraduationCap size={16} />,
      children: `The roadmap I followed to be here.`,
    },
    {
      title: 'Projects',
      to: '/projects',
      search: { page: '1', pageSize: PAGE_SIZE_OPTIONS[0].value },
      icon: <FolderGit2 size={16} />,
      children: `Some of the projects I did and what's to come.`,
    },
    {
      title: 'Contact',
      to: '/contact',
      icon: <Contact size={16} />,
    },
  ],
  posts: {
    title: 'Posts',
    contents: posts,
    path: { to: '/posts/$postId' },
    items: [
      {
        title: 'All Posts',
        to: '/posts',
        search: { page: '1', pageSize: PAGE_SIZE_OPTIONS[0].value },
        children: 'See the list for all posts.',
      },
      {
        title: 'New Post',
        to: '/posts/create',
        children: 'Create a new post here',
      },
    ],
  },
};
