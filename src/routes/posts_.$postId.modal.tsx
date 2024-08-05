import { Button } from '@components/ui/button';
import { DialogClose, DialogContent, DialogFooter, DialogHeader } from '@components/ui/dialog';
import { Separator } from '@components/ui/separator';
import { normalizeDate } from '@lib/utils';
import { Dialog, DialogDescription } from '@radix-ui/react-dialog';
import { postQueryOptions } from '@services/hooks/postQueryOptions';
import { PostNotFoundError } from '@services/hooks/posts';
import { ErrorComponent, ErrorComponentProps, Link, createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/posts/$postId/modal')({
  loader: ({ context: { queryClient }, params: { postId } }) => queryClient.ensureQueryData(postQueryOptions(postId)),
  errorComponent: PostErrorComponent as any,
  component: PostModalComponent,
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof PostNotFoundError) {
    return <div>{error.message}</div>;
  }

  return <ErrorComponent error={error} />;
}

function PostModalComponent() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          navigate({
            to: '/posts',
            search: {
              page: '1',
              pageSize: '15',
            },
          });
        }
      }}
    >
      <DialogContent className="flex w-full flex-col">
        <div className="flex w-full justify-center">
          <img src={post.thumbnail} className="flex aspect-video w-80 rounded-md" />
        </div>
        <Separator className="mt-2" />
        <div className="flex justify-evenly">
          <DialogHeader>{post.title}</DialogHeader>
          <DialogDescription>{normalizeDate(post.date)}</DialogDescription>
        </div>
        <Separator />
        <DialogDescription className="text-center">{post.description}</DialogDescription>
        <Separator />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Link
              to="/posts"
              search={{
                page: '1',
                pageSize: '15',
              }}
            >
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
