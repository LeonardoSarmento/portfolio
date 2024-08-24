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
import { ScrollArea } from './ui/scroll-area';
import { ScrollToTopSmooth } from '@services/utils/utils';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { useMediaQuery } from '@services/hooks/use-media-query';

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
  const smallHeight = window.innerHeight <= 590;
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const onSubmitDropdownMenu = form.handleSubmit((data) => {
    setOpen(false);
    form.setValue('page', '1');
    navigate({
      resetScroll: false,
      to: path.to,
      search: {
        tags: data.tags?.length === 0 ? undefined : data.tags,
        title: data.title === '' ? undefined : data.title,
        pageSize: data.pageSize,
        page: '1',
        views: data.views,
      },
    });
    ScrollToTopSmooth();
  });

  function onSubmit(data: FilterType) {
    form.setValue('page', '1');
    ScrollToTopSmooth();
    console.log('click nav');

    navigate({
      resetScroll: false,
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
  const filterMenuContent = FILTERMENUCONTENT();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center space-y-4 xl:mx-14">
          <div className="mx-7 flex gap-4 max-sm:flex-col max-sm:flex-wrap xl:mx-0 xl:mr-14">
            {auth.isAuthenticated ? (
              <Button onClick={() => navigate(createPath)} type="button" className="w-32 flex-none max-sm:w-full">
                {filterMenuContent.createButton.title}
              </Button>
            ) : null}
            <div className="flex w-full gap-4">
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
          </div>
          <div className="flex flex-wrap gap-4 xl:flex-nowrap">
            <Dialog open={open} onOpenChange={setOpen} modal={isDesktop ? false : true}>
              <DialogTrigger asChild className="mx-7 w-full xl:hidden">
                <Button type="button">Filtros</Button>
              </DialogTrigger>
              <DialogContent className="w-72 rounded-md sm:max-w-md md:w-full xl:hidden">
                <ScrollArea className={`${smallHeight ? 'h-[500px]' : 'h-full'}`}>
                  <div className="flex flex-col gap-3">
                    <DialogHeader>
                      <DialogTitle>{filterMenuContent.filter.title}</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <FormField
                      control={form.control}
                      name="tags"
                      render={() => (
                        <FormItem>
                          <FormLabel>{filterMenuContent.filter.theme.title}</FormLabel>
                          <FormDescription>{filterMenuContent.filter.theme.description}</FormDescription>
                          <ScrollArea className="m-2 h-48">
                            {TAGS &&
                              TAGS.map((tag) => (
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
                          </ScrollArea>
                        </FormItem>
                      )}
                    />
                    <Separator />
                    <FormField
                      control={form.control}
                      name="pageSize"
                      render={({ field }) => (
                        <FormItem
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            console.log('click');
                          }}
                        >
                          <FormItem>
                            <FormLabel className="text-sm font-normal">
                              {filterMenuContent.filter.quantity.title}
                            </FormLabel>
                            <FormDescription>{filterMenuContent.filter.quantity.description}</FormDescription>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                              key={field.value}
                            >
                              <FormControl
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <SelectTrigger
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                  }}
                                >
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
                    <Separator />
                    <DialogFooter className="gap-3">
                      <DialogClose asChild>
                        <Button type="button" onClick={onSubmitDropdownMenu} className="w-full">
                          {filterMenuContent.filter.buttons.filterTitle}
                        </Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          onClick={() => {
                            setOpen(false);
                            ResetFilters();
                          }}
                          className="w-full"
                          variant="destructive"
                        >
                          {filterMenuContent.filter.buttons.clearTitle}
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            {/* <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="mx-7 w-full xl:hidden" onClick={(e) => e.stopPropagation()} type="button">
                  Filtros
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex w-56 flex-col xl:hidden">
                <DropdownMenuLabel>{filterMenuContent.filter.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation(), e.preventDefault();
                  }}
                >
                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <FormLabel>{filterMenuContent.filter.theme.title}</FormLabel>
                        <FormDescription>{filterMenuContent.filter.theme.description}</FormDescription>
                        <ScrollArea className="m-2 h-48">
                          {TAGS &&
                            TAGS.map((tag) => (
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
                        </ScrollArea>
                      </FormItem>
                    )}
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FormField
                    control={form.control}
                    name="pageSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormItem>
                          <FormLabel className="text-sm font-normal">
                            {filterMenuContent.filter.quantity.title}
                          </FormLabel>
                          <FormDescription>{filterMenuContent.filter.quantity.description}</FormDescription>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                            key={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={filterMenuContent.filter.quantity.placeholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PAGE_SIZE_OPTIONS.map((option) => (
                                <SelectItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
                                  key={option.value}
                                  value={option.value}
                                >
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
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button type="button" onClick={onSubmitDropdownMenu} className="w-full">
                    {filterMenuContent.filter.buttons.filterTitle}
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button type="button" onClick={ResetFilters} className="w-full" variant="destructive">
                    {filterMenuContent.filter.buttons.clearTitle}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            <SideMenuComponent
              ResetFilters={ResetFilters}
              form={form}
              Tags={TAGS}
              className={`max-xl:hidden`}
              // className={`${openFilter ? 'absolute flex flex-col xl:mt-0 xl:flex xl:flex-col' : 'hidden xl:flex xl:flex-col'}`}
            />
            {hasContent ? (
              <div>{children}</div>
            ) : (
              <div className="flex w-full justify-center">
                <NoContentComponent ResetFilters={ResetFilters} />
              </div>
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
    <div className="flex w-full flex-col items-center justify-center gap-4 max-lg:mx-6">
      <CardContent className="flex items-center justify-center rounded-xl border p-6 max-sm:flex-wrap-reverse">
        {/* <CardContent className="flex items-center justify-center rounded-xl border p-6"> */}
        <blockquote className="space-y-2 pr-6 text-center">
          <p className="text-lg">&ldquo;{filterMenuContent.noContent.content.text}&rdquo;</p>
          <footer className="text-sm">{filterMenuContent.noContent.content.author}</footer>
        </blockquote>
        <Separator orientation="vertical" className="mx-1 max-sm:my-4 max-sm:h-[1px] max-sm:w-full" />
        <img
          className="h-[300px] rounded-md max-sm:h-32 max-sm:w-32"
          src={filterMenuContent.noContent.image.src}
          alt={filterMenuContent.noContent.image.alt}
        />
      </CardContent>
      <div className="flex gap-4 max-sm:mb-5 max-sm:flex-col">
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
    ScrollToTopSmooth();
    navigate({
      resetScroll: false,
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
