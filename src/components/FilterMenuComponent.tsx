import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { FilterType } from '@services/types/Filters';
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
import { useQueryTags } from '@services/hooks/tagsQueryOptions';
import { cn } from '@lib/utils';
import { useState } from 'react';
import { useOnOutsideClick } from '@services/hooks/useOutsideClick';

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
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const { innerBorderRef } = useOnOutsideClick(() => setOpenFilter(false));

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
    setOpenFilter(false);
  }
  const filterMenuContent = FILTERMENUCONTENT();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center space-y-4 xl:mx-14">
          <div className="mx-7 flex gap-4 xl:mx-0 xl:mr-14">
            {auth.isAuthenticated ? (
              <Button onClick={() => navigate(createPath)} type="button" className="w-32 flex-none">
                {filterMenuContent.createButton.title}
              </Button>
            ) : null}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="max-w-none flex-1">
                  <FormControl>
                    <Input placeholder={filterMenuContent.search.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" className="flex-none gap-2">
              <MagnifyingGlassIcon className="h-4 w-4 shrink-0 opacity-50" />
              {filterMenuContent.search.buttonText}
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 xl:flex-nowrap">
            <Button className="mx-7 w-full xl:hidden" onClick={() => setOpenFilter((prev) => !prev)} type="button">
              Filtros
            </Button>
            <div ref={innerBorderRef} className='max-sm:w-full justify-center flex'>
              <SideMenuComponent
                ResetFilters={() => {
                  ResetFilters(), setOpenFilter(false);
                }}
                form={form}
                Tags={TAGS}
                className={`${openFilter ? 'absolute flex flex-col xl:mt-0 xl:flex xl:flex-col' : 'hidden xl:flex xl:flex-col'}`}
              />
            </div>
            {hasContent ? <div>{children}</div> : <NoContentComponent ResetFilters={ResetFilters} />}
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
  className,
}: {
  form: UseFormReturn<FilterType>;
  Tags?: TagType[];
  className?: string;
  ResetFilters: () => void;
}) {
  const filterMenuContent = FILTERMENUCONTENT();
  return (
    <Card className={cn('z-[1] h-fit xl:relative xl:mx-0 xl:w-32', className)}>
      <CardHeader>
        <CardTitle className="text-center">{filterMenuContent.filter.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="mt-3 flex flex-col space-y-5">
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>{filterMenuContent.filter.theme.title}</FormLabel>
              <FormDescription>{filterMenuContent.filter.theme.description}</FormDescription>
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
                <FormLabel className="text-sm font-normal">{filterMenuContent.filter.quantity.title}</FormLabel>
                <FormDescription>{filterMenuContent.filter.quantity.description}</FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value} key={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={filterMenuContent.filter.quantity.placeholder} />
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
        <Button type="submit">{filterMenuContent.filter.buttons.filterTitle}</Button>
        <Button type="button" onClick={ResetFilters} variant="destructive">
          {filterMenuContent.filter.buttons.clearTitle}
        </Button>
      </CardContent>
    </Card>
  );
}

function NoContentComponent({ ResetFilters }: { ResetFilters: () => void }) {
  const filterMenuContent = FILTERMENUCONTENT();
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <CardContent className="flex items-center justify-center rounded-xl border p-6">
        <blockquote className="space-y-2 pr-6">
          <p className="text-lg">&ldquo;{filterMenuContent.noContent.content.text}&rdquo;</p>
          <footer className="text-sm">{filterMenuContent.noContent.content.author}</footer>
        </blockquote>
        <Separator orientation="vertical" className="mx-1" />
        <img
          className="h-[300px] rounded-md"
          src={filterMenuContent.noContent.image.src}
          alt={filterMenuContent.noContent.image.alt}
        />
      </CardContent>
      <div className="flex gap-4">
        <CardTitle className="mt-2">{filterMenuContent.noContent.button.description}</CardTitle>
        <Button type="submit" onClick={ResetFilters}>
          {filterMenuContent.noContent.button.title}
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
  const filterMenuContent = FILTERMENUCONTENT();
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
              <p className="text-sm">{filterMenuContent.pagination.back}</p>
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
              <p className="text-sm">{filterMenuContent.pagination.foward}</p>
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
