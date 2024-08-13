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
    <Card className="col-span-12 mx-10 grid h-fit grid-cols-12 p-4 text-center">
      <img src={content.thumbnail} className="col-span-12 mx-auto h-32 w-1/5 justify-center rounded" />
      <CardHeader className="col-span-12 gap-3">
        <CardTitle>{content.title}</CardTitle>
        <div className="col-span-12 flex w-full justify-center gap-2">
          <>
            {content.tags
              ? content.tags.map((tag) => (
                  <Badge key={tag.value} className="justify-center">
                    {tag.value}
                  </Badge>
                ))
              : null}
          </>
        </div>
      </CardHeader>
      <BreadcrumbResponsive
        currentFolder={{ title: shareComponent.breadcrumb.title }}
        options={optionsUrl}
        className="col-span-12 flex justify-center"
      />
      <div className="col-span-12 grid grid-cols-12 gap-2">
        <CardDescription className="col-span-12 pt-2">{normalizeDate(content.date)}</CardDescription>
        <CardDescription className="col-span-4 col-start-5 flex items-center justify-center">
          {content.description}
        </CardDescription>
        {auth.isAuthenticated ? (
          <Button
            type="button"
            className="col-span-1 col-start-10"
            onClick={() => router.navigate(path)}
          >
            {shareComponent.buttons.edit}
          </Button>
        ) : null}
        <Button className="col-span-1 col-start-11" onClick={() => router.history.back()}>
          {shareComponent.buttons.goBack}
        </Button>
        <PopoverShareComponent url={shareComponentURL} shareComponent={shareComponent.shareComponent} />
      </div>
    </Card>
  );
}
