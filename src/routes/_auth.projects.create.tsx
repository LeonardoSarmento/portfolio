import { Card, CardTitle } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import {
  HEADERCARDCREATEPROJECTCONTENT,
  MANAGEMARKDOWNCREATECONTENT,
  TOASTMESSAGESCONTENT,
} from '@constants/by-id-content';
import { HeaderThumbnailComponent, HeaderFormComponent, ManageMarkdownComponent } from '@components/ContentComponents';
import { SubmitContent } from '@services/utils/toasts';
import { useAuth } from '@services/hooks/auth';
import { CreatePublicationSchema, CreatePublicationType } from '@services/types/Publication';
import { useQueryProjectsTags } from '@services/hooks/tagsQueryOptions';
import { createMarkdownFile } from '@services/utils/utils';

export const Route = createFileRoute('/_auth/projects/create')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(useQueryProjectsTags),
  component: CreateProjectComponent,
});

function CreateProjectComponent() {
  const headerCardCreateProjectContent = HEADERCARDCREATEPROJECTCONTENT();
  const menageMarkdownCreateContent = MANAGEMARKDOWNCREATECONTENT();
  const toastMessages = TOASTMESSAGESCONTENT();
  const TAGS = Route.useLoaderData();
  const auth = useAuth();
  const form = useForm<CreatePublicationType>({
    resolver: zodResolver(CreatePublicationSchema),
    mode: 'onChange',
    defaultValues: {
      file: null,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    SubmitContent({ isAuthenticated: auth.isAuthenticated, messages: toastMessages });
    createMarkdownFile(data.title, data.body);
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
              {form.getValues('title') ? form.watch('title') : headerCardCreateProjectContent.title}
            </CardTitle>
            <div className="flex flex-col flex-wrap xl:flex-row xl:flex-nowrap">
              <HeaderThumbnailComponent form={form} textContent={headerCardCreateProjectContent.thumbnail} />
              <HeaderFormComponent
                form={form}
                onClick={handleReset}
                textContent={headerCardCreateProjectContent.form}
                TAGS={TAGS}
              />
            </div>
          </Card>
          <ManageMarkdownComponent form={form} path="body" contentText={menageMarkdownCreateContent} />
        </div>
      </form>
    </Form>
  );
}
