import { Card, CardTitle } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { projectQueryOptions } from '@services/hooks/postQueryOptions';
import { HEADERCARDPROJECTCONTENT, MANAGEMARKDOWNCONTENT, TOASTMESSAGESCONTENT } from '@constants/by-id-content';
import { HeaderThumbnailComponent, HeaderFormComponent, ManageMarkdownComponent } from '@components/ContentComponents';
import { handleDeleteContent, SubmitContent } from '@services/utils/toasts';
import { useAuth } from '@services/hooks/auth';
import { EditPublicationSchema, EditPublicationType } from '@services/types/Publication';
import { MovetoTopButton } from '@components/MoveToTop';
import { createMarkdownFile } from '@services/utils/utils';
import i18n from '../i18n/config';
import { useQueryProjectsTags } from '@services/hooks/tagsQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_auth/projects/$projectId/edit')({
  loader: ({ context: { queryClient }, params: { projectId } }) =>
    queryClient.ensureQueryData(projectQueryOptions(projectId, i18n.language)),
  component: EditPostsComponent,
});

function EditPostsComponent() {
  const headerCardProjectContent = HEADERCARDPROJECTCONTENT();
  const menageMarkdownContent = MANAGEMARKDOWNCONTENT();
  const toastMessages = TOASTMESSAGESCONTENT();
  const TAGS = useSuspenseQuery(useQueryProjectsTags);
  const auth = useAuth();
  const project = Route.useLoaderData();
  const form = useForm<EditPublicationType>({
    resolver: zodResolver(EditPublicationSchema),
    mode: 'onChange',
    defaultValues: project,
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
              {form.getValues('title') ? form.watch('title') : headerCardProjectContent.title}
            </CardTitle>
            <div className="flex flex-col flex-wrap xl:flex-row xl:flex-nowrap">
              <HeaderThumbnailComponent form={form} textContent={headerCardProjectContent.thumbnail} />
              <HeaderFormComponent
                form={form}
                onClick={() => handleDeleteContent({ messages: toastMessages })}
                textContent={headerCardProjectContent.form}
                TAGS={TAGS.data ? TAGS.data : []}
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
