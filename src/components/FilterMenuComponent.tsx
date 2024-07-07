import { useFormContext } from 'react-hook-form';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { FilterType } from '@services/types/Filters';
import { useQueryTags } from '@services/hooks/postsQueryOptions';
import { NavigateOptions, useNavigate } from '@tanstack/react-router';

export function FilterMenuComponent({ path }: { path: NavigateOptions }) {
  const form = useFormContext<FilterType>();
  const navigate = useNavigate();
  const { data: TAGS } = useQueryTags();

  function ResetFilters() {
    form.setValue('tags', []), form.setValue('count', 'All'), form.setValue('title', ''), navigate(path);
  }

  return (
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
            name="count"
            render={({ field }) => (
              <FormItem>
                <FormItem className="flex flex-col items-start space-y-3">
                  <FormLabel className="text-sm font-normal">Quantidade</FormLabel>
                  <FormDescription>Selecione a quantidade de você deseja visualizar.</FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue className="w-fit" placeholder="Qntd" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={'All'}>Todos</SelectItem>
                      <SelectItem value={'5'}>5</SelectItem>
                      <SelectItem value={'25'}>25</SelectItem>
                      <SelectItem value={'50'}>50</SelectItem>
                      <SelectItem value={'100'}>100</SelectItem>
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
  );
}
