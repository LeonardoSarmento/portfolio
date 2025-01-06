import { CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@components/ui/carousel';
import { GAMESCONTENT } from '@constants/games-content';
import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';

export const Route = createFileRoute('/interactive/games')({
  component: GamesPage,
});
export default function GamesPage() {
  const path = useLocation();
  return (
    <div className="flex flex-1 flex-col justify-start gap-y-10">
      {path.pathname !== '/interactive/games' ? <SideMenuGames /> : null}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function SideMenuGames() {
  const ComponentsPage = GAMESCONTENT();
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  return (
    <div className="px-16">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-semibold">{ComponentsPage.content.title}</CardTitle>
        <CardDescription>{ComponentsPage.content.description}</CardDescription>
      </CardHeader>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="flex-1"
      >
        <CarouselContent className="py-2 2xl:justify-center">
          {ComponentsPage.content.items.map((content) => (
            <CarouselItem key={content.cardTitle} className="flex basis-1/2 md:basis-1/3 lg:basis-2/12 xl:basis-2/12 2xl:basis-1/12">
              <Link
                to={content.link}
                className="block flex-1 text-nowrap rounded-lg border px-2 text-center text-muted-foreground transition-transform duration-500 hover:scale-110 hover:bg-muted hover:text-primary"
              >
                {content.title}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}