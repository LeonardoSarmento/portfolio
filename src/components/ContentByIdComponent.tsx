import { BreadcrumbResponsive } from '@components/Breadcrumbs';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { normalizeDate } from '@lib/utils';
import { useAuth } from '@services/hooks/auth';
import { NavigateOptions, useRouter } from '@tanstack/react-router';
import { TByIdComponent } from '@constants/by-id-content';
import { PostType } from '@services/types/Post';
import { PopoverShareComponent } from './ShareComponent';

export function HeaderContentComponent({
  content,
  path,
  shareComponent,
  shareComponentURL,
  optionsUrl,
}: {
  content: PostType;
  path: NavigateOptions;
  shareComponent: TByIdComponent;
  shareComponentURL: string;
  optionsUrl?: {
    to: string;
    title: string;
  }[];
}) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <Card className="mx-10 flex flex-col space-y-2 p-4  text-center">
      <img src={content.thumbnail} className="mx-auto h-52 justify-center rounded" />
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <div className="mx-auto space-x-2">
          {content.tags
            ? content.tags.map((tag) => (
                <Badge key={tag.value} className="w-fit">
                  <p>{tag.value}</p>
                </Badge>
              ))
            : null}
        </div>
      </CardHeader>
      <BreadcrumbResponsive
        currentFolder={{ title: shareComponent.breadcrumb.title }}
        options={optionsUrl}
        className="mx-auto"
      />
      <CardDescription>{normalizeDate(content.date)}</CardDescription>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CardDescription className="lg:col-start-2">{content.description}</CardDescription>
        <div className="flex flex-wrap justify-center gap-2 lg:col-start-3 lg:justify-self-end">
          {auth.isAuthenticated ? (
            <Button type="button" onClick={() => router.navigate(path)}>
              {shareComponent.buttons.edit}
            </Button>
          ) : null}
          <Button onClick={() => router.history.back()}>{shareComponent.buttons.goBack}</Button>
          <PopoverShareComponent url={shareComponentURL} shareComponent={shareComponent.shareComponent} />
        </div>
      </div>
    </Card>
  );
}
