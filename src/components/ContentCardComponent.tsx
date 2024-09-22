import { Badge } from '@components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { Link, LinkOptions } from '@tanstack/react-router';
import { useAuth } from '@services/hooks/auth';
import { CopyToClipboardRoute } from '@services/utils/utils';
import { Menu } from 'lucide-react';
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
import { DROPDOWNMENUCONTENT } from '@constants/dropdown-share';
import { handleDeleteContent } from '@services/utils/toasts';
import { cn, normalizeDate } from '@lib/utils';
import { PublicationType } from '@services/types/Publication';
import { TOASTMESSAGESCONTENT } from '@constants/by-id-content';
import { useTranslation } from 'react-i18next';

type TBaseContentCard = {
  content: PublicationType;
  index: number;
  path: LinkOptions;
  className?: string;
};
type TContentCard =
  | ({
      dropdownMenu?: false;
    } & TBaseContentCard)
  | ({
      editPath: LinkOptions;
      URL: string;
      dropdownMenu?: true;
    } & TBaseContentCard);
export function ContentCardComponent(props: TContentCard) {
  return (
    <Card className={cn('text-center', props.className)}>
      <Link
        className="flex flex-col"
        to={props.path.to}
        params={{ projectId: props.content.id, postId: props.content.id }}
        // mask={{ to: '/posts/$postId', params: { postId: post.id } }}
      >
        <img
          className="m-2 aspect-video rounded-md"
          src={props.content.thumbnail}
          alt={props.content.title}
        />
        <CardHeader className='h-32'>{props.content.title}</CardHeader>
        <ScrollArea className="h-16 rounded-md lg:h-24">
          <div className="flex flex-wrap justify-center gap-2 px-0">
            {props.content.tags
              ? props.content.tags.map((tag) => (
                  <Badge key={tag.value} className="w-14 justify-center lg:w-16 xl:w-20">
                    <p className="text-xs">{tag.value}</p>
                  </Badge>
                ))
              : null}
          </div>
        </ScrollArea>
        <ScrollArea className="m-2 h-28 rounded-md">
          <CardDescription className='mx-4'>{props.content.description}</CardDescription>
        </ScrollArea>
        <CardFooter className={`flex ${!props.dropdownMenu ? 'justify-center' : 'justify-between'}`}>
          <p className="text-center text-sm">{normalizeDate(props.content.date)}</p>
          {props.dropdownMenu ? (
            <DropdownMenuComponent
              editable={props.content.editable}
              id={props.content.id}
              path={props.editPath.to}
              URL={props.URL}
            />
          ) : null}
        </CardFooter>
      </Link>
    </Card>
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
  const dropdownMenuContent = DROPDOWNMENUCONTENT();
  const toastMessages = TOASTMESSAGESCONTENT();
  const { t } = useTranslation('byIdContent');
  toastMessages.share.success.description = t('toastMessage.share.success.description', {
    url: URL + id,
    interpolation: { escapeValue: false },
  });
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={(e) => e.preventDefault()} type="button">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{dropdownMenuContent.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation(), CopyToClipboardRoute({ url: URL + id, messages: toastMessages.share });
            }}
          >
            {dropdownMenuContent.share}
          </DropdownMenuItem>
          {auth.isAuthenticated ? (
            <>
              {editable === false ? null : (
                <Link to={path} params={{ projectId: id, postId: id }}>
                  <DropdownMenuItem>
                    {dropdownMenuContent.edit}
                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                </Link>
              )}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(), handleDeleteContent({ messages: toastMessages });
                }}
              >
                {dropdownMenuContent.delete}
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
