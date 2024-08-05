import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { FilterType } from '@services/types/Filters';
import { useQueryTags } from '@services/hooks/postsQueryOptions';
import { NavigateOptions, useNavigate } from '@tanstack/react-router';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from './ui/input';
import { useAuth } from '@services/hooks/auth';
import { useFormFilters } from '@services/hooks/useFormFilters';
import { NOT_FOUND } from '@services/utils/Images';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from './ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export const PAGE_SIZE_OPTIONS: { value: string; text: string }[] = [
  {
    value: '15',
    text: '15',
  },
  {
    value: '25',
    text: '25',
  },
  {
    value: '50',
    text: '50',
  },
  {
    value: '100',
    text: '100',
  },
];

export function FilterMenuComponent({
  path,
  createPath,
  children,
  hasContent,
  contentSize,
}: {
  path: NavigateOptions;
  createPath: NavigateOptions;
  children: React.ReactNode;
  hasContent: boolean;
  contentSize: number;
}) {
  const auth = useAuth();
  const navigate = useNavigate();
  const { data: TAGS } = useQueryTags();
  const { form, ResetFilters } = useFormFilters({ path });

  function onSubmit(data: FilterType) {
    // toast('You submitted the following values:', {
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    // console.log('posts: ', posts);
    console.log('data: ', data.tags);
    form.setValue('page', '1');
    navigate({
      to: path.to as string,
      search: {
        tags: data.tags?.length === 0 ? undefined : data.tags,
        title: data.title === '' ? undefined : data.title,
        pageSize: data.pageSize,
        page: '1',
        views: data.views,
      },
    });
  }

  function DisablePreviousPageBtn(page: string | undefined) {
    if (!page) return true;
    if (+page <= 1) return true;

    return false;
  }

  function DisableNextPageBtn(pageSize: string | undefined) {
    console.log('shoud disable next: ', contentSize, pageSize);
    if (contentSize === 0) true;
    if (pageSize && contentSize < +pageSize) return true;

    return false;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid-rows-auto m-3 grid grid-cols-12 gap-4 px-16">
          <div className="col-span-12 grid grid-cols-12 items-center justify-end gap-2 space-x-2">
            {auth.isAuthenticated ? (
              <Button className="m-2" onClick={() => navigate(createPath)} type="button">
                Criar
              </Button>
            ) : null}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-6 col-start-6 flex w-full">
                  <FormControl>
                    <Input placeholder="Procure por um título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              Procurar
            </Button>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <div className="col-span-1 row-span-full flex w-full">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="text-center">Filtros</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="mt-3 flex flex-col space-y-5">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="my-4 flex justify-center">Temas</FormLabel>
                          <FormDescription>Selecione quais temas você quer ler sobre.</FormDescription>
                        </div>
                        {TAGS &&
                          TAGS.map((tag) => (
                            <FormField
                              key={tag.id}
                              control={form.control}
                              name="tags"
                              render={({ field }) => {
                                return (
                                  <FormItem key={tag.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(tag.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange(field.value ? [...field.value, tag.id] : [tag.id])
                                            : field.onChange(field.value?.filter((value) => value !== tag.id));
                                        }}
                                        onClick={() => console.log(field.value)}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{tag.label}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <FormField
                    control={form.control}
                    name="pageSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem className="flex flex-col items-start space-y-3">
                          <FormLabel className="text-sm font-normal">Quantidade</FormLabel>
                          <FormDescription>Selecione a quantidade de você deseja visualizar.</FormDescription>
                          <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} key={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue className="w-fit" placeholder="Qntd" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* <SelectItem value={'All'}>Todos</SelectItem> */}
                              {PAGE_SIZE_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.text}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Filtrar</Button>
                  <Button type="button" onClick={ResetFilters} variant="destructive">
                    Limpar
                  </Button>
                </CardContent>
              </Card>
            </div>
            {hasContent ? (
              children
            ) : (
              <div className="col-span-11 flex flex-col items-center justify-center gap-4">
                <CardContent className="flex items-center justify-center rounded-xl border p-6">
                  <blockquote className="space-y-2 pr-6">
                    <p className="text-lg">
                      &ldquo;Não encontrei nenhuma postagem com esse tema. falhei, fui mlk blz? :(&rdquo;
                    </p>
                    <footer className="text-sm">Leonardo Sarmento</footer>
                  </blockquote>
                  <Separator orientation="vertical" className="mx-1" />
                  <img className="h-80 rounded-md" src={NOT_FOUND} alt="Thumb Up Sad Cat" />
                </CardContent>
                <div className="flex gap-4">
                  <CardTitle className="mt-2">Retire os filtros e tente novamente: </CardTitle>
                  <Button type="submit" onClick={ResetFilters}>
                    Tentar novamente
                  </Button>
                </div>
                {/* <ReloadIcon className="mr-2 h-10 w-6 animate-spin" /> */}
              </div>
            )}
            <Pagination className="col-span-12 mt-4">
              <PaginationContent>
                <PaginationItem>
                  <FormField
                    control={form.control}
                    name="page"
                    render={({ field }) => (
                      <FormItem className="col-span-6 col-start-6 flex w-full">
                        <FormControl>
                          <Button
                            type="button"
                            disabled={DisablePreviousPageBtn(form.watch('page'))}
                            onClick={() => {
                              console.log('previous page: ', field.value),
                                form.setValue('page', field.value ? `${+field.value - 1}` : '1');
                              navigate({
                                to: path.to as string,
                                search: {
                                  page: field.value ? `${+field.value - 1}` : '1',
                                  pageSize: form.watch('pageSize'),
                                  tags: form.watch('tags')?.length === 0 ? undefined : form.watch('tags'),
                                  title: form.watch('title') === '' ? undefined : form.watch('title'),
                                },
                              });
                            }}
                          >
                            <ChevronLeftIcon className="h-4 w-4" />
                            <span>Previous</span>
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </PaginationItem>
                <PaginationItem>
                  <FormField
                    control={form.control}
                    name="page"
                    render={() => (
                      <FormItem className="col-span-6 col-start-6 flex w-full">
                        <FormControl>
                          <Button
                            type="button"
                            onClick={() => {
                              form.setValue('page', '1'),
                                navigate({
                                  to: path.to as string,
                                  search: {
                                    page: '1',
                                    pageSize: form.watch('pageSize'),
                                    tags: form.watch('tags')?.length === 0 ? undefined : form.watch('tags'),
                                    title: form.watch('title') === '' ? undefined : form.watch('title'),
                                  },
                                });
                            }}
                          >
                            1
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <FormField
                    control={form.control}
                    name="page"
                    render={({ field }) => (
                      <FormItem className="col-span-6 col-start-6 flex w-full">
                        <FormControl>
                          {field.value === '1' ? null : (
                            <Button type="button">
                              <span>{form.watch('page')}</span>
                            </Button>
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </PaginationItem>
                <PaginationItem>
                  <FormField
                    control={form.control}
                    name="page"
                    render={({ field }) => (
                      <FormItem className="col-span-6 col-start-6 flex w-full">
                        <FormControl>
                          <Button
                            type="button"
                            disabled={DisableNextPageBtn(form.watch('pageSize'))}
                            onClick={() => {
                              console.log('next page: ', field.value),
                                form.setValue('page', field.value ? `${+field.value + 1}` : '1');
                              navigate({
                                to: path.to as string,
                                search: {
                                  page: field.value ? `${+field.value + 1}` : field.value,
                                  pageSize: form.watch('pageSize'),
                                  tags: form.watch('tags')?.length === 0 ? undefined : form.watch('tags'),
                                  title: form.watch('title') === '' ? undefined : form.watch('title'),
                                },
                              });
                            }}
                          >
                            <span>next</span>
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </form>
    </Form>
  );
}
