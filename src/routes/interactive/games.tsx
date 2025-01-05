import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { GAMESCONTENT } from '@constants/games-content';
import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/interactive/games')({
  component: GamesPage,
});
export default function GamesPage() {
  const ComponentsPage = GAMESCONTENT();
  return (
    <div className="flex space-x-3">
      <Card className="ml-16 h-fit w-48 items-center space-y-4 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="border-b pb-3 text-center">
          <CardTitle className="text-lg font-semibold">{ComponentsPage.content.title}</CardTitle>
          <CardDescription>{ComponentsPage.content.description}</CardDescription>
        </CardHeader>
        <ScrollArea className="h-96 w-full">
          <CardContent className="flex flex-col space-y-4 px-4">
            {ComponentsPage.content.items.map((content) => (
              <Link
                key={content.cardTitle}
                to={content.link}
                className="block rounded-lg px-2 text-center text-muted-foreground transition-transform duration-500 hover:scale-110 hover:bg-muted hover:text-primary"
              >
                {content.title}
              </Link>
            ))}
          </CardContent>
        </ScrollArea>
        <CardFooter className="flex w-full justify-center pt-3">
          <Button asChild className="transition-transform duration-300 hover:scale-105">
            <Link to="/interactive/games" className="px-4 py-2">
              Todos Jogos
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
