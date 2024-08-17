import { BreadcrumbResponsive } from '@components/Breadcrumbs';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { normalizeDate } from '@lib/utils';
import { useAuth } from '@services/hooks/auth';
import { Link, NavigateOptions, useRouter } from '@tanstack/react-router';
import { PopoverShareComponent } from './ShareComponent';
import { PublicationType } from '@services/types/Publication';
import { TByIdComponent } from '@services/types/constants/by-id';

export function HeaderContentComponent({
  content,
  path,
  shareComponent,
  shareComponentURL,
  optionsUrl,
}: {
  content: PublicationType;
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
                <Link
                  key={tag.value}
                  to={`/${shareComponent.breadcrumb.title}`}
                  search={{ tags: [tag.value], page: '1', pageSize: '15' }}
                >
                  <Badge className="w-fit">
                    <p>{tag.value}</p>
                  </Badge>
                </Link>
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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
