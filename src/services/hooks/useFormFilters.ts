import { zodResolver } from '@hookform/resolvers/zod';
import { FilterSchema, FilterType } from '@services/types/Filters';
import { NavigateOptions, useNavigate, useSearch } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export function useFormFilters({ path }: { path: NavigateOptions }) {
  const navigate = useNavigate();
  const filters = useSearch({ strict: false });
  const form = useForm<FilterType>({
    resolver: zodResolver(FilterSchema),
    defaultValues: filters,
  });

  function ResetFilters() {
    form.setValue('tags', []), form.setValue('count', 'All'), form.setValue('title', ''), navigate(path);
  }

  return {
    form,
    ResetFilters,
  };
}
