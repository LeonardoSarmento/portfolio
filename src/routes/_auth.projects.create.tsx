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
import { tagsQueryOptions } from '@services/hooks/tagsQueryOptions';

export const Route = createFileRoute('/_auth/projects/create')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(tagsQueryOptions),
  component: CreateProjectComponent,
  meta: ({}) => [
    {
      charSet: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: `Create a project | Leonardo`,
      content: 'Tell me a project that you had fun and learned something.',
    },
  ],
});

function CreateProjectComponent() {
  const headerCardCreateProjectContent = HEADERCARDCREATEPROJECTCONTENT();
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
        <div className="mx-3 xl:mx-10 flex flex-col gap-4">
          <Card className="flex flex-col flex-wrap xl:p-4 pb-4 text-center xl:flex-nowrap">
            <CardTitle className="py-6 text-3xl">
              {form.getValues('title') ? form.watch('title') : headerCardCreateProjectContent.title}
            </CardTitle>
            <div className='flex flex-col flex-wrap xl:flex-nowrap xl:flex-row'>
              <HeaderThumbnailComponent form={form} textContent={headerCardCreateProjectContent.thumbnail} />
              <HeaderFormComponent
                form={form}
                onClick={handleReset}
                textContent={headerCardCreateProjectContent.form}
              />
            </div>
          </Card>
          <ManageMarkdownComponent form={form} path="body" contentText={menageMarkdownCreateContent} />
        </div>
      </form>
    </Form>
  );
}
