import { Card, CardTitle } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import {
  HEADERCARDCREATEPOSTCONTENT,
  MANAGEMARKDOWNCREATECONTENT,
  TOASTMESSAGESCONTENT,
} from '@constants/by-id-content';
import { HeaderFormComponent, HeaderThumbnailComponent, ManageMarkdownComponent } from '@components/ContentComponents';
import { SubmitContent } from '@services/utils/toasts';
import { useAuth } from '@services/hooks/auth';
import { CreatePublicationSchema, CreatePublicationType } from '@services/types/Publication';
import { tagsQueryOptions } from '@services/hooks/tagsQueryOptions';

export const Route = createFileRoute('/_auth/posts/create')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(tagsQueryOptions),
  component: CreatePostsComponent,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Create a post | Leonardo`,
      content: 'Write about something fun.',
    },
  ],
});

function CreatePostsComponent() {
  const headerCardCreatePostContent = HEADERCARDCREATEPOSTCONTENT();
  const menageMarkdownCreateContent = MANAGEMARKDOWNCREATECONTENT();
  const toastMessages = TOASTMESSAGESCONTENT();

  const auth = useAuth();
  const form = useForm<CreatePublicationType>({
    resolver: zodResolver(CreatePublicationSchema),
    mode: 'onChange',
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = form.handleSubmit(() => {
    SubmitContent({ isAuthenticated: auth.isAuthenticated, messages: toastMessages });
  });

  function handleReset() {
    form.reset({ body: '', title: '', tags: [], description: '', file: null });
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="mx-3 flex flex-col gap-4 xl:mx-10">
          <Card className="flex flex-col flex-wrap pb-4 text-center xl:flex-nowrap xl:p-4">
            <CardTitle className="py-6 text-3xl">
              {form.getValues('title') ? form.watch('title') : headerCardCreatePostContent.title}
            </CardTitle>
            <div className="flex flex-col flex-wrap xl:flex-row xl:flex-nowrap">
              <HeaderThumbnailComponent form={form} textContent={headerCardCreatePostContent.thumbnail} />
              <HeaderFormComponent
                form={form}
                onClick={handleReset}
                textContent={headerCardCreatePostContent.form}
              />
            </div>
          </Card>
          <ManageMarkdownComponent form={form} path="body" contentText={menageMarkdownCreateContent} />
        </div>
      </form>
    </Form>
  );
}
