import { Card, CardTitle } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { tagsQueryOptions } from '@services/hooks/postsQueryOptions';
import { CreatePostSchema, CreatePostType } from '@services/types/Post';
import { HEADERCARDCREATEPOSTCONTENT, MANAGEMARKDOWNCREATECONTENT } from '@constants/by-id-content';
import { HeaderFormComponent, HeaderThumbnailComponent, ManageMarkdownComponent } from '@components/ContentComponents';
import { SubmitContent } from '@services/utils/toasts';
import { useAuth } from '@services/hooks/auth';

export const Route = createFileRoute('/_auth/posts/create')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(tagsQueryOptions),
  component: CreatePostsComponent,
});

function CreatePostsComponent() {
  const auth = useAuth();
  const form = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema),
    mode: 'onChange',
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = form.handleSubmit(() => {
    SubmitContent({ isAuthenticated: auth.isAuthenticated });
  });

  function handleReset() {
    form.reset({ body: '', title: '', tags: [], description: '', file: null });
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="mx-10 flex flex-col gap-4">
          <Card className="grid grid-cols-12 p-4 text-center">
            <CardTitle className="col-span-12 py-6 text-3xl">
              {form.getValues('title') ? form.watch('title') : HEADERCARDCREATEPOSTCONTENT.title}
            </CardTitle>
            <HeaderThumbnailComponent form={form} textContent={HEADERCARDCREATEPOSTCONTENT.thumbnail} />
            <HeaderFormComponent form={form} onClick={handleReset} textContent={HEADERCARDCREATEPOSTCONTENT.form} />
          </Card>
          <ManageMarkdownComponent form={form} path="body" contentText={MANAGEMARKDOWNCREATECONTENT} />
        </div>
      </form>
    </Form>
  );
}
