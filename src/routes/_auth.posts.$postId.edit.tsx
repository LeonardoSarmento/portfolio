import { Card, CardTitle } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { postQueryOptions } from '@services/hooks/postQueryOptions';
import { HEADERCARDPOSTCONTENT, MANAGEMARKDOWNCONTENT } from '@constants/by-id-content';
import { HeaderFormComponent, HeaderThumbnailComponent, ManageMarkdownComponent } from '@components/ContentComponents';
import { handleDeleteContent, SubmitContent } from '@services/utils/toasts';
import { useAuth } from '@services/hooks/auth';
import { EditPublicationSchema, EditPublicationType } from '@services/types/Publication';

export const Route = createFileRoute('/_auth/posts/$postId/edit')({
  loader: ({ context: { queryClient }, params: { postId } }) => queryClient.ensureQueryData(postQueryOptions(postId)),
  component: EditPostsComponent,
});

function EditPostsComponent() {
  const headerCardPostContent = HEADERCARDPOSTCONTENT();
  const menageMarkdownContent = MANAGEMARKDOWNCONTENT();
  const auth = useAuth();

  const post = Route.useLoaderData();
  const form = useForm<EditPublicationType>({
    resolver: zodResolver(EditPublicationSchema),
    mode: 'onChange',
    defaultValues: post,
  });

  const onSubmit = form.handleSubmit(() => {
    SubmitContent({ isAuthenticated: auth.isAuthenticated });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="mx-10 flex flex-col gap-4">
          <Card className="grid grid-cols-12 p-4 text-center">
            <CardTitle className="col-span-12 py-6 text-3xl">
              {form.getValues('title') ? form.watch('title') : headerCardPostContent.title}
            </CardTitle>
            <HeaderThumbnailComponent form={form} textContent={headerCardPostContent.thumbnail} />
            <HeaderFormComponent form={form} onClick={handleDeleteContent} textContent={headerCardPostContent.form} />
          </Card>
          <ManageMarkdownComponent form={form} path="body" contentText={menageMarkdownContent} />
        </div>
      </form>
    </Form>
  );
}
