import Dropzone from '@components/Dropzone';
import MarkdownRenderer from '@components/MarkdownRenderer';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@services/hooks/auth';
import { CreatePostSchema, CreatePostType, CreateProjectSchema, CreateProjectType } from '@services/types/User';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Angry, FileCheck2Icon, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AutosizeTextarea } from '@components/ui/autosize-textarea';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@components/ui/resizable';
import MultipleSelector from '@components/ui/multiple-selector';
import { useQueryTags } from '@services/hooks/postsQueryOptions';
import { postQueryOptions, projectQueryOptions } from '@services/hooks/postQueryOptions';

export const Route = createFileRoute('/_auth/projects/$projectId/edit')({
  loader: ({ context: { queryClient }, params: { projectId } }) =>
    queryClient.ensureQueryData(projectQueryOptions(projectId)),
  // pendingComponent: () => <div>Loading...</div>,
  component: EditPostsComponent,
});

function EditPostsComponent() {
  const { data: TAGS } = useQueryTags();
  const project = Route.useLoaderData();
  const router = useRouter();

  const auth = useAuth();
  const form = useForm<CreateProjectType>({
    resolver: zodResolver(CreateProjectSchema.omit({ date: true })),
    mode: 'onChange',
    defaultValues: project,
  });

  const onSubmit = form.handleSubmit((values) => {
    if (!auth.isAuthenticated) {
      toast.error('Você não está autenticado cara :(', {
        description: 'Você não deveria ter acesso aqui... tô de olho em você ein',
      });
      return;
    }
    toast.success(`Ehh mentira!! Te enganei kkkk`, {
      description: `Não tem como criar um post ainda mas quem sabe um dia...`,
    });
  });

  type AllowedTypes = {
    name: string;
    types: string[];
  };

  const allowedTypes: AllowedTypes[] = [
    // { name: 'csv', types: ['text/csv'] },
    // {
    //   name: 'excel',
    //   types: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
    // },
    { name: 'image/png', types: ['image/png'] },
    // { name: 'pdf', types: ['application/pdf'] },
    // { name: 'md', types: ['text/markdown'] },
    // { name: 'json', types: ['application/json'] },
  ];

  function getAllowedMimeTypes(allowedTypes: AllowedTypes[]): string {
    // Combine all MIME types from each allowed type into a single array
    const allMimeTypes = allowedTypes.flatMap((type) => type.types);

    // Join the MIME types into a comma-separated string
    return allMimeTypes.join(', ');
  }

  function handleOnDrop(acceptedFiles: FileList | null) {
    console.log('acceptedFiles: ', acceptedFiles);
    if (acceptedFiles && acceptedFiles.length > 0) {
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type),
      );
      console.log('fileType', fileType);
      if (!fileType) {
        form.setValue('file', null);
        form.setError('file', {
          message: 'File type is not valid',
          type: 'typeError',
        });
      } else {
        form.setValue('file', acceptedFiles[0]);
        form.clearErrors('file');
      }
    } else {
      form.setValue('file', null);
      form.setError('file', {
        message: 'File is required',
        type: 'typeError',
      });
    }
  }

  // useEffect(() => {
  //   if (post) {
  //     form.setValue('title', post.title);
  //     form.setValue('description', post.description);
  //     form.setValue('body', post.body);
  //     form.setValue('thumbnail', post.thumbnail);
  //     form.setValue('tags', post.tags);
  //     form.setValue('date', post.date);
  //   }
  // }, [post]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <Card className="col-span-12 mx-10 grid h-fit grid-cols-12 p-4 text-center">
            <CardTitle className="col-span-12 py-6 text-3xl">
              {form.getValues('title') ? form.watch('title') : 'Criar novo projeto'}
            </CardTitle>
            <CardHeader className="col-span-6 gap-3">
              {form.getValues('thumbnail') ? (
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <>
                      <CardTitle>Thumbnail</CardTitle>
                      <div className="relative flex flex-col items-center justify-center gap-3">
                        <img className="aspect-video w-1/2 rounded-md" src={form.watch('thumbnail')} />
                        <div className="relative flex items-center justify-center">
                          <FileCheck2Icon className="w-20" />
                          <p className="text-sm font-medium">{form.watch('thumbnail')}</p>
                          <Button variant="ghost" onClick={() => form.resetField('thumbnail', { defaultValue: '' })}>
                            <X className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <>
                      <CardTitle>Thumbnail</CardTitle>
                      {field.value ? (
                        <div className="relative flex flex-col items-center justify-center gap-3">
                          <>
                            {field.value.type === 'application/json' ? (
                              <MarkdownRenderer markdown={field.value.name} />
                            ) : (
                              <img className="aspect-video w-full rounded-md" src={URL.createObjectURL(field.value)} />
                            )}
                          </>
                          <div className="relative flex items-center justify-center gap-3">
                            <FileCheck2Icon className="w-20" />
                            <p className="text-sm font-medium">{form.watch('file')?.name}</p>
                            <Button variant="ghost" onClick={() => form.resetField('file')}>
                              <X className="text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <FormItem className="w-full">
                          <FormControl>
                            <Dropzone
                              {...field}
                              dropMessage="Solte seu arquivo ou clique aqui"
                              accept={getAllowedMimeTypes(allowedTypes)}
                              handleOnDrop={handleOnDrop}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    </>
                  )}
                />
              )}
              {/* <Input type="file" /> */}
            </CardHeader>
            <CardContent className="col-span-6 flex flex-col justify-between gap-6 py-0">
              <div className="col-span-6 flex h-full flex-col justify-center">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-12 items-center">
                      <FormLabel className="col-span-1">Título</FormLabel>
                      <FormControl className="col-span-11">
                        <Input placeholder="O nome do seu post" {...field} />
                      </FormControl>
                      {/* <FormDescription>Só pra testar um negócinho aqui rapidinho</FormDescription> */}
                      <FormMessage className="col-span-12" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-12 items-center">
                      <FormLabel className="col-span-1">Descrição</FormLabel>
                      <FormControl className="col-span-11">
                        <Input placeholder="Faça uma descrição da sua postagem" {...field} />
                      </FormControl>
                      {/* <FormDescription>Só pra testar um negócinho aqui rapidinho</FormDescription> */}
                      <FormMessage className="col-span-12" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-12 items-center">
                      <FormLabel className="col-span-1">Tags</FormLabel>
                      <div className="col-span-11">
                        <FormControl>
                          <MultipleSelector
                            {...field}
                            defaultOptions={TAGS}
                            // creatable
                            placeholder="Selecione alguma tag..."
                            emptyIndicator={
                              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                Não foi encontrado esse tema.
                              </p>
                            }
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="col-span-12" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-center gap-3">
                <Button type="submit">Salvar</Button>
                <Button type="button" onClick={() => router.history.back()}>
                  Voltar
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    toast.error('Sem deletar post por aqui malandro', {
                      icon: <Angry />,
                      description: 'Deixa isso pra uma outra hora',
                      classNames: {
                        title: 'ml-2',
                        description: 'ml-2',
                      },
                    })
                  }
                  variant="destructive"
                >
                  Deletar
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-12 mx-10 mb-10 grid h-fit grid-cols-12 p-4">
            <ResizablePanelGroup direction="horizontal" className="col-span-12">
              <ResizablePanel>
                <CardContent className="col-span-4 space-y-3 text-center">
                  <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-12 items-center">
                        <FormLabel className="col-span-12">Conteúdo</FormLabel>
                        <FormControl className="col-span-12">
                          <AutosizeTextarea placeholder="Diga oq vc tem guardado no coração." {...field} />
                        </FormControl>
                        <FormDescription className="col-span-12">
                          Se você não mentiu aqui então bora postar mlk
                        </FormDescription>
                        <FormMessage className="col-span-12" />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Salvar
                  </Button>
                </CardContent>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel>
                <CardContent className="col-span-8 space-y-1">
                  <CardTitle className="mb-2 flex justify-center">Preview</CardTitle>
                  <MarkdownRenderer className="p-5" markdown={form.watch('body')} />
                </CardContent>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Card>
        </div>
      </form>
    </Form>
  );
}
