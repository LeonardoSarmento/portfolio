import { InteracitvesPageComponent } from '@components/InterativesPageComponent';
import { GAMESCONTENT } from '@constants/games-content';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/interactive/games/')({
  component: GamesPage,
});

export default function GamesPage() {
  const GamesPage = GAMESCONTENT();
  return <InteracitvesPageComponent content={GamesPage.content} />;
}
