import { Card, CardDescription, CardFooter, CardHeader } from '@components/ui/card';
import { Link, LinkOptions } from '@tanstack/react-router';
import { useAuth } from '@services/hooks/auth';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { Angry, Menu } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import { Badge } from '@components/ui/badge';
import { PostType } from '@services/types/Post';
import { DROPDOWNMENUCONTENT } from '@constants/dropdown-share';

export function RenderAllContents({
  contents,
  path,
  editPath,
  URL,
}: {
  contents: PostType[];
  path: LinkOptions;
  editPath: LinkOptions;
  URL: string;
}) {
  return (
    <div className="col-span-11 col-start-2 grid h-fit w-full grid-cols-12 gap-4">
      {contents.length > 0
        ? contents.map((content, index) => (
            <Card key={`${content.id}-${index}`} className="col-span-2 row-span-1 p-2 text-center">
              <Link
                className="flex h-full flex-col"
                to={path.to}
                params={{ projectId: content.id, postId: content.id }}
                // mask={{ to: '/posts/$postId', params: { postId: post.id } }}
              >
                <img className="aspect-video w-full rounded-md" src={content.thumbnail} />
                <div className="h-1/2">
                  <CardHeader className="flex flex-1">{content.title}</CardHeader>
                </div>
                <ScrollArea className="h-28 w-full rounded-md">
                  <div className="grid grid-cols-4 gap-2 px-4">
                    <>
                      {content.tags
                        ? content.tags.map((tag) => (
                            <Badge key={tag.value} className="col-span-1 justify-center">
                              {tag.value}
                            </Badge>
                          ))
                        : null}
                    </>
                  </div>
                </ScrollArea>
                <div className="mt-4 flex h-full w-full flex-col justify-between">
                  <ScrollArea className="h-28 w-full rounded-md">
                    <CardDescription>{content.description}</CardDescription>
                  </ScrollArea>
                  <CardFooter className="mt-4 flex w-full text-center">
                    <p className="w-full text-center">{content.date.toLocaleDateString()}</p>
                    <DropdownMenuComponent editable={content.editable} id={content.id} path={editPath.to} URL={URL} />
                  </CardFooter>
                </div>
              </Link>
            </Card>
          ))
        : null}
    </div>
  );
}

function DropdownMenuComponent({
  id,
  path,
  editable,
  URL,
}: {
  id: string;
  path: LinkOptions['to'];
  editable?: boolean;
  URL: string;
}) {
  const auth = useAuth();
  return (
    <div className="z-50 flex w-fit justify-self-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" onClick={(e) => e.preventDefault()} type="button">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative w-56">
          <DropdownMenuLabel>{DROPDOWNMENUCONTENT.title}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation(), CopyToClipboardRoute(`${URL}/${id}`);
              }}
            >
              {DROPDOWNMENUCONTENT.share}
            </DropdownMenuItem>
            {auth.isAuthenticated ? (
              <>
                {editable === false ? null : (
                  <Link to={path} params={{ projectId: id, postId: id }}>
                    <DropdownMenuItem>
                      {DROPDOWNMENUCONTENT.edit}
                      {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation(),
                      toast.error(DROPDOWNMENUCONTENT.toast.error.title, {
                        icon: <Angry />,
                        description: DROPDOWNMENUCONTENT.toast.error.description,
                        classNames: {
                          title: 'ml-2',
                          description: 'ml-2',
                        },
                      });
                  }}
                >
                  {DROPDOWNMENUCONTENT.delete}
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
