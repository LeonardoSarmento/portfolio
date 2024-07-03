import { BreadcrumbResponsive } from '@components/Breadcrumbs';
import MarkdownRenderer from '@components/MarkdownRenderer';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { normalizeDate } from '@lib/utils';
import { useAuth } from '@services/hooks/auth';
import { postQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { useQueryPostsUrl } from '@services/hooks/postsQueryOptions';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { ErrorComponent, ErrorComponentProps, createFileRoute, useRouter } from '@tanstack/react-router';
import { CopyIcon, Share2 } from 'lucide-react';

export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params: { postId } }) => queryClient.ensureQueryData(postQueryOptions(postId)),
  errorComponent: PostErrorComponent as any,
  component: PostComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }

  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const post = Route.useLoaderData();
  const { data: optionsUrl } = useQueryPostsUrl();
  const router = useRouter();
  const auth = useAuth();

  const URL = `${import.meta.env.VITE_BASE_URL}/posts/${post.id}`;

  return (
    <>
      <Card className="col-span-12 mx-10 grid h-fit grid-cols-12 p-4 text-center">
        <img src={post.thumbnail} className="col-span-12 mx-auto h-32 w-1/5 justify-center rounded" />
        <CardHeader className="col-span-12 gap-3">
          <CardTitle>{post.title}</CardTitle>
          <div className="col-span-12 flex w-full justify-center gap-2">
            <>
              {post.tags
                ? post.tags.map((tag) => (
                    <Badge key={tag.value} className="justify-center">
                      {tag.value}
                    </Badge>
                  ))
                : null}
            </>
          </div>
        </CardHeader>
        <BreadcrumbResponsive
          currentFolder={{ title: 'Posts' }}
          options={optionsUrl}
          className="col-span-12 flex justify-center"
        />
        <div className="col-span-12 grid grid-cols-12 gap-2">
          <CardDescription className="col-span-12 pt-2">{normalizeDate(post.date)}</CardDescription>
          <CardDescription className="col-span-4 col-start-5 flex items-center justify-center">
            {post.description}
          </CardDescription>
          {auth.isAuthenticated ? (
            <Button
              className="col-span-1 col-start-10"
              onClick={() => router.navigate({ to: '/posts/$postId/edit', params: { postId: post.id } })}
            >
              Editar
            </Button>
          ) : null}
          <Button className="col-span-1 col-start-11" onClick={() => router.history.back()}>
            Voltar
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="col-span-1 col-start-12 flex justify-center gap-2">
                <p>Compartilhar</p>
                <Share2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[520px]">
              <div className="flex flex-col space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold">Compartilhe com seus inimigos :)</h3>
                <p className="text-sm text-muted-foreground">
                  Qualquer um com esse link em ctrl+c ctrl+v ficará mais forte que nunca.
                </p>
              </div>
              <div className="flex items-center space-x-2 pt-4">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" defaultValue={URL} readOnly className="h-9" />
                </div>
                <Button type="button" size="sm" className="px-3" onClick={() => CopyToClipboardRoute(URL)}>
                  <span className="sr-only">Copiar</span>
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
      <MarkdownRenderer markdown={post.body} />
    </>
  );
}
