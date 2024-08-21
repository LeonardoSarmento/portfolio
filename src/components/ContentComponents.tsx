import Dropzone from '@components/Dropzone';
import MarkdownRenderer from '@components/MarkdownRenderer';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { useRouter } from '@tanstack/react-router';
import { FileCheck2Icon, X } from 'lucide-react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { AutosizeTextarea } from '@components/ui/autosize-textarea';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@components/ui/resizable';
import MultipleSelector from '@components/ui/multiple-selector';
import { getAllowedMimeTypes, handleOnDrop } from '@services/utils/utils';
import { ALLOWED_TYPES } from '@services/types/AllowedFiles';
import { CreatePublicationType, EditPublicationType } from '@services/types/Publication';
import { THeaderCardContent, TManageMarkdownContent } from '@services/types/constants/by-id';
import { useQueryTags } from '@services/hooks/tagsQueryOptions';
import { PropsWithChildren } from 'react';

export function HeaderFormComponent({
  form,
  onClick,
  textContent,
}: {
  form: UseFormReturn<EditPublicationType | CreatePublicationType>;
  textContent: THeaderCardContent['form'];
  onClick: () => void;
}) {
  const { data: TAGS } = useQueryTags();
  const router = useRouter();
  return (
    <CardContent className="col-span-6 flex w-full flex-col justify-between gap-6 py-0">
      <div className="my-auto flex flex-col justify-center max-sm:gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <ResponsiveFormItem>
              <FormLabel className="w-[75px]">{textContent.title.label}</FormLabel>
              <FormControl>
                <Input placeholder={textContent.title.placeholder} {...field} />
              </FormControl>
              {/* <FormDescription>Só pra testar um negócinho aqui rapidinho</FormDescription> */}
              <FormMessage />
            </ResponsiveFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <ResponsiveFormItem>
              <FormLabel className="w-[75px]">{textContent.description.label}</FormLabel>
              <FormControl>
                <Input placeholder={textContent.description.placeholder} {...field} />
              </FormControl>
              {/* <FormDescription>Só pra testar um negócinho aqui rapidinho</FormDescription> */}
              <FormMessage />
            </ResponsiveFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <ResponsiveFormItem>
              <FormLabel className="w-[75px]">{textContent.tags.label}</FormLabel>
              <FormControl>
                <MultipleSelector
                  {...field}
                  defaultOptions={TAGS}
                  // creatable
                  placeholder={textContent.tags.placeholder}
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      {textContent.tags.notfound}
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </ResponsiveFormItem>
          )}
        />
      </div>
      <div className="flex justify-center gap-3">
        <Button type="submit">{textContent.buttons.save}</Button>
        <Button type="button" onClick={() => router.history.back()}>
          {textContent.buttons.goBack}
        </Button>
        <Button type="button" onClick={onClick} variant="destructive">
          {textContent.buttons.destructive}
        </Button>
      </div>
    </CardContent>
  );
}

function ResponsiveFormItem({ children }: PropsWithChildren) {
  return (
    <FormItem className="flex flex-wrap items-center gap-0 space-x-4 max-sm:justify-center md:flex-nowrap xl:gap-4">
      {children}
    </FormItem>
  );
}

export function HeaderThumbnailComponent({
  form,
  textContent,
}: {
  form: UseFormReturn<EditPublicationType | CreatePublicationType>;
  textContent: THeaderCardContent['thumbnail'];
}) {
  const ThumbnailInfo = ({ fileName, onClick }: { fileName?: string; onClick: () => void }) => {
    return (
      <div className="flex items-center justify-between max-sm:flex-wrap max-sm:flex-col gap-3">
        <FileCheck2Icon className="mx-3 w-4" />
        <p className="text-sm font-medium max-sm:max-w-sm overflow-hidden w-full">{fileName}</p>
        <Button variant="ghost" className="w-fit" onClick={onClick}>
          <X className="text-destructive" />
        </Button>
      </div>
    );
  };
  const ThumbnailImage = ({ image }: { image?: string }) => {
    return (
      <img
        className="aspect-video h-[250px] w-[450px] rounded-md max-2xl:h-[200px] max-2xl:w-[400px] max-xl:h-52 max-lg:w-96"
        src={image}
      />
    );
  };
  return (
    <CardHeader className="col-span-6 flex w-full flex-col items-center gap-6">
      <CardTitle>{textContent.title}</CardTitle>
      {form.getValues('thumbnail') ? (
        <FormField
          control={form.control}
          name="thumbnail"
          render={() => (
            <>
              <ThumbnailImage image={form.watch('thumbnail')} />
              <ThumbnailInfo
                fileName={form.watch('thumbnail')}
                onClick={() => form.resetField('thumbnail', { defaultValue: '' })}
              />
            </>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <>
              {field.value ? (
                <>
                  {field.value.type === 'application/json' ? (
                    <MarkdownRenderer markdown={field.value.name} />
                  ) : (
                    <ThumbnailImage image={URL.createObjectURL(field.value)} />
                  )}
                  <ThumbnailInfo fileName={form.watch('file')?.name} onClick={() => form.resetField('file')} />
                </>
              ) : (
                <FormItem className="w-full">
                  <FormControl>
                    <Dropzone
                      {...field}
                      dropMessage={textContent.dropMessage}
                      accept={getAllowedMimeTypes(ALLOWED_TYPES)}
                      handleOnDrop={(acceptedFiles) => handleOnDrop(acceptedFiles, form)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            </>
          )}
        />
      )}
    </CardHeader>
  );
}

export function ManageMarkdownComponent<TFieldValues extends FieldValues>({
  form,
  path,
  contentText,
}: {
  contentText: TManageMarkdownContent;
  form: UseFormReturn<TFieldValues>;
  path: Path<TFieldValues>;
}) {
  return (
    <Card className="max-sm:py-4 xl:p-4">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <CardContent className="space-y-3 text-center">
            <FormField
              control={form.control}
              name={path}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{contentText.content.label}</FormLabel>
                  <FormControl>
                    <AutosizeTextarea placeholder={contentText.content.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{contentText.content.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {contentText.button.text}
            </Button>
          </CardContent>
        </ResizablePanel>
        <ResizableHandle withHandle className='max-sm:hidden' />
        <ResizablePanel className='max-sm:hidden'>
          <CardContent className="space-y-3">
            <CardTitle className="text-center">{contentText.preview.title}</CardTitle>
            <MarkdownRenderer className="p-5" markdown={form.watch(path)} />
          </CardContent>
        </ResizablePanel>
      </ResizablePanelGroup>
      <MarkdownRenderer className="p-5 md:hidden" markdown={form.watch(path)} />
    </Card>
  );
}
