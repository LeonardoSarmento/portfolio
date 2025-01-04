import { InteracitvesPageComponent } from '@components/InterativesPageComponent';
import { COMPONENTSCONTENT } from '@constants/components-content';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/interactive/components/')({
  component: ComponentsPage,
});
export default function ComponentsPage() {
  const ComponentsPage = COMPONENTSCONTENT();
  return <InteracitvesPageComponent content={ComponentsPage.content} />;
}
