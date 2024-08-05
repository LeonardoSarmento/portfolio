import * as React from 'react';

import { cn } from '@lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu';
import { Link, LinkOptions } from '@tanstack/react-router';
import { ModeToggle } from './Mode-toggle';
import { Contact, FolderGit2, GraduationCap, Handshake } from 'lucide-react';
import { posts } from '@assets/data/posts';
import { UserToggle } from './UserToggle';
import { MY_PHOTO } from '@services/utils/Images';
import { PAGE_SIZE_OPTIONS } from './FilterMenuComponent';

export function NavigationMenuGroup() {
  return (
    <div className="m-5 flex items-center justify-between sm:grid sm:grid-cols-12 sm:justify-end">
      <NavigationMenu className="col-span-10 justify-self-end text-center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-2 sm:px-8">About Me !</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      to="/"
                    >
                      <img className="h-full w-full rounded-md" src={MY_PHOTO} alt="Leonardo's photo" />
                      <div className="mb-2 mt-4 text-lg font-medium">Leonardo</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Hi!, welcome to my portfolio. Be free to explore my site.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  to="/introduction"
                  title="Introduction"
                  
                  icon={<Handshake size={16} />}
                >
                  How I got here? Who I am? Come with me and i'll explain.
                </ListItem>
                <ListItem
                  to="/experience"
                  title="Experience"
                  
                  icon={<GraduationCap size={16} />}
                >
                  The roadmap I followed to be here.
                </ListItem>
                <ListItem
                  to="/projects"
                  title="Projects"
                  search={{ page: '1', pageSize: PAGE_SIZE_OPTIONS[0].value }}
                  icon={<FolderGit2 size={16} />}
                >
                  Some of the projects I did and what's to come.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-4 sm:px-8">Posts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {posts
                  .filter((_, index) => index <= 5)
                  .map((component) => (
                    <ListItem
                      key={component.id}
                      title={component.title}
                      to="/posts/$postId"
                      params={{ postId: component.id }}
                      children={component.description}
                    />
                  ))}
                <ListItem
                  key={'AllPosts'}
                  title="All Posts"
                  to="/posts"
                  search={{ page: '1', pageSize: PAGE_SIZE_OPTIONS[0].value }}
                  children={'See the list for all posts.'}
                />
                <ListItem
                  key={'CreatePost'}
                  title="New Post"
                  to="/posts/create"
                  
                  children={'Create a new post here'}
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ListItem
              key={'contact'}
              title="Contact"
              to="/contact"
              
              className="data-[state=open]:bg-accent/50' inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 sm:px-8"
              icon={<Contact size={16} />}
            />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <UserToggle className="justify-self-end" />
      <ModeToggle className="justify-self-end" />
    </div>
  );
}

type ListItemType = { className?: string; title: string; children?: React.ReactNode; icon?: JSX.Element } & LinkOptions;
const ListItem = ({ className, title, children, icon, ...props }: ListItemType) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        {...props}
      >
        <div className="flex justify-center">
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="ml-2">{icon}</div>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground ">{children}</p>
      </Link>
    </NavigationMenuLink>
  );
};
ListItem.displayName = 'ListItem';
