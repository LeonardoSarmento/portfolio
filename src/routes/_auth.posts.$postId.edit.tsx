import { Card, CardTitle } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { postQueryOptions } from '@services/hooks/postQueryOptions';
import { HEADERCARDPOSTCONTENT, MANAGEMARKDOWNCONTENT, TOASTMESSAGESCONTENT } from '@constants/by-id-content';
import { HeaderFormComponent, HeaderThumbnailComponent, ManageMarkdownComponent } from '@components/ContentComponents';
import { handleDeleteContent, SubmitContent } from '@services/utils/toasts';
import { useAuth } from '@services/hooks/auth';
import { EditPublicationSchema, EditPublicationType } from '@services/types/Publication';
import { MovetoTopButton } from '@components/MoveToTop';
import { createMarkdownFile } from '@services/utils/utils';
import i18n from '../i18n/config';
import { useQueryPostsTags } from '@services/hooks/tagsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_auth/posts/$postId/edit')({
  loader: ({ context: { queryClient }, params: { postId } }) =>
    queryClient.ensureQueryData(postQueryOptions(postId, i18n.language)),
  component: EditPostsComponent,
  meta: ({ loaderData }) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Edit ${loaderData.title} | Leonardo`,
      content: loaderData.description,
    },
  ],
});

function EditPostsComponent() {
  const headerCardPostContent = HEADERCARDPOSTCONTENT();
  const menageMarkdownContent = MANAGEMARKDOWNCONTENT();
  const toastMessages = TOASTMESSAGESCONTENT();
  const TAGS = useSuspenseQuery(useQueryPostsTags)
  const auth = useAuth();

  const post = Route.useLoaderData();
  const form = useForm<EditPublicationType>({
    resolver: zodResolver(EditPublicationSchema),
    mode: 'onChange',
    defaultValues: post,
  });

  const onSubmit = form.handleSubmit((data) => {
    SubmitContent({ isAuthenticated: auth.isAuthenticated, messages: toastMessages });
    createMarkdownFile(data.title, data.body);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="mx-3 flex flex-col gap-4 xl:mx-10">
          <Card className="flex flex-col flex-wrap pb-4 text-center xl:flex-nowrap xl:p-4">
            <CardTitle className="py-6 text-3xl">
              {form.getValues('title') ? form.watch('title') : headerCardPostContent.title}
            </CardTitle>
            <div className="flex flex-col flex-wrap xl:flex-row xl:flex-nowrap">
              <HeaderThumbnailComponent form={form} textContent={headerCardPostContent.thumbnail} />
              <HeaderFormComponent
                form={form}
                onClick={() => handleDeleteContent({ messages: toastMessages })}
                textContent={headerCardPostContent.form}
                TAGS={TAGS.data}
              />
            </div>
          </Card>
          <ManageMarkdownComponent form={form} path="body" contentText={menageMarkdownContent} />
        </div>
      </form>
      <MovetoTopButton />
    </Form>
  );
}
