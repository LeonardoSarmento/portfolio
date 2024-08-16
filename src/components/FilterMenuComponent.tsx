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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from './ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FieldValues, Path, UseControllerReturn, useFormContext, UseFormReturn } from 'react-hook-form';
import { TagType } from '@services/types/Tag';
import { FILTERMENUCONTENT } from '@constants/filter-menu-content';

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
  const navigate = useNavigate();
  const auth = useAuth();
  const { data: TAGS } = useQueryTags();
  const { form, ResetFilters } = useFormFilters({ path });

  function onSubmit(data: FilterType) {
    form.setValue('page', '1');
    navigate({
      to: path.to,
      search: {
        tags: data.tags?.length === 0 ? undefined : data.tags,
        title: data.title === '' ? undefined : data.title,
        pageSize: data.pageSize,
        page: '1',
        views: data.views,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4 px-16">
          <div className="col-span-12 grid grid-cols-12 items-center justify-end gap-4">
            {auth.isAuthenticated ? (
              <Button onClick={() => navigate(createPath)} type="button">
                {FILTERMENUCONTENT.createButton.title}
              </Button>
            ) : null}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-6 col-start-6">
                  <FormControl>
                    <Input placeholder={FILTERMENUCONTENT.search.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              <MagnifyingGlassIcon className="h-4 w-4 shrink-0 opacity-50" />
              {FILTERMENUCONTENT.search.buttonText}
            </Button>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-4">
            <SideMenuComponent ResetFilters={ResetFilters} form={form} Tags={TAGS} />
            {hasContent ? (
              <div className="col-span-11">{children}</div>
            ) : (
              <NoContentComponent ResetFilters={ResetFilters} />
            )}
          </div>
          <PaginationComponent contentSize={contentSize} form={form} path={path} />
        </div>
      </form>
    </Form>
  );
}

function SideMenuComponent({
  form,
  Tags,
  ResetFilters,
}: {
  form: UseFormReturn<FilterType>;
  Tags?: TagType[];
  ResetFilters: () => void;
}) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-center">{FILTERMENUCONTENT.filter.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="mt-3 flex flex-col space-y-5">
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>{FILTERMENUCONTENT.filter.theme.title}</FormLabel>
              <FormDescription>{FILTERMENUCONTENT.filter.theme.description}</FormDescription>
              {Tags &&
                Tags.map((tag) => (
                  <FormField
                    key={tag.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem key={tag.id} className="flex space-x-3 space-y-0">
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
              <FormItem>
                <FormLabel className="text-sm font-normal">{FILTERMENUCONTENT.filter.quantity.title}</FormLabel>
                <FormDescription>{FILTERMENUCONTENT.filter.quantity.description}</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} key={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={FILTERMENUCONTENT.filter.quantity.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
        <Button type="submit">{FILTERMENUCONTENT.filter.buttons.filterTitle}</Button>
        <Button type="button" onClick={ResetFilters} variant="destructive">
          {FILTERMENUCONTENT.filter.buttons.clearTitle}
        </Button>
      </CardContent>
    </Card>
  );
}

function NoContentComponent({ ResetFilters }: { ResetFilters: () => void }) {
  return (
    <div className="col-span-11 flex flex-col items-center justify-center gap-4">
      <CardContent className="flex items-center justify-center rounded-xl border p-6">
        <blockquote className="space-y-2 pr-6">
          <p className="text-lg">&ldquo;{FILTERMENUCONTENT.noContent.content.text}&rdquo;</p>
          <footer className="text-sm">{FILTERMENUCONTENT.noContent.content.author}</footer>
        </blockquote>
        <Separator orientation="vertical" className="mx-1" />
        <img
          className="h-[300px] rounded-md"
          src={FILTERMENUCONTENT.noContent.image.src}
          alt={FILTERMENUCONTENT.noContent.image.alt}
        />
      </CardContent>
      <div className="flex gap-4">
        <CardTitle className="mt-2">{FILTERMENUCONTENT.noContent.button.description}</CardTitle>
        <Button type="submit" onClick={ResetFilters}>
          {FILTERMENUCONTENT.noContent.button.title}
        </Button>
      </div>
      {/* <ReloadIcon className="mr-2 h-10 w-6 animate-spin" /> */}
    </div>
  );
}

function PaginationComponent({
  form,
  path,
  contentSize,
}: {
  form: UseFormReturn<FilterType>;
  path: NavigateOptions;
  contentSize: number;
}) {
  const navigate = useNavigate();

  function navigatePagination({ page }: { page: string }) {
    form.setValue('page', page);
    navigate({
      to: path.to,
      search: {
        page: page,
        pageSize: form.watch('pageSize'),
        tags: form.watch('tags')?.length === 0 ? undefined : form.watch('tags'),
        title: form.watch('title') === '' ? undefined : form.watch('title'),
      },
    });
  }

  function DisablePreviousPageBtn(page: string | undefined) {
    if (!page) return true;
    if (+page <= 1) return true;

    return false;
  }

  function DisableNextPageBtn(pageSize: string | undefined) {
    if (contentSize === 0) true;
    if (pageSize && contentSize < +pageSize) return true;

    return false;
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationButton<FilterType> path="page">
          {({ field }) => (
            <Button
              type="button"
              disabled={DisablePreviousPageBtn(form.watch('page'))}
              onClick={() => {
                const page: string = field.value ? `${+field.value - 1}` : '1';
                navigatePagination({ page });
              }}
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <p className="text-sm">{FILTERMENUCONTENT.pagination.back}</p>
            </Button>
          )}
        </PaginationButton>
        <PaginationButton<FilterType> path="page">
          {() => (
            <Button
              type="button"
              onClick={() => {
                const page: string = '1';
                navigatePagination({ page });
              }}
            >
              1
            </Button>
          )}
        </PaginationButton>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationButton<FilterType> path="page">
          {({ field }) => (
            <>
              {field.value === '1' ? null : (
                <Button type="button">
                  <p>{form.watch('page')}</p>
                </Button>
              )}
            </>
          )}
        </PaginationButton>
        <PaginationButton<FilterType> path="page">
          {({ field }) => (
            <Button
              type="button"
              disabled={DisableNextPageBtn(form.watch('pageSize'))}
              onClick={() => {
                const page: string = field.value ? `${+field.value + 1}` : '1';
                navigatePagination({ page });
              }}
            >
              <p className="text-sm">{FILTERMENUCONTENT.pagination.foward}</p>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          )}
        </PaginationButton>
      </PaginationContent>
    </Pagination>
  );
}

function PaginationButton<TFieldValues extends FieldValues>({
  children,
  path,
}: {
  children: (field: UseControllerReturn<TFieldValues>) => React.ReactNode;
  path: Path<TFieldValues>;
}) {
  const form = useFormContext<TFieldValues>();
  return (
    <PaginationItem>
      <FormField
        control={form.control}
        name={path}
        render={(render) => (
          <FormItem>
            <FormControl>{children(render)}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </PaginationItem>
  );
}
