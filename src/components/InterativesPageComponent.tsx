import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { InteracitvesPageContentType } from '@services/types/constants/games-content';

export function InteracitvesPageComponent({ content }: InteracitvesPageContentType) {
  return (
    <div className="container mx-auto px-4 space-y-4 py-8">
      <h1 className="text-center text-4xl font-bold">{content.title}</h1>
      <p className="text-center text-sm text-muted-foreground">{content.description}</p>
      <ScrollArea className="h-[600px] px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((c, index) => (
            <Card key={index} className="shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold capitalize">{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link to={c.link}>{content.button}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
