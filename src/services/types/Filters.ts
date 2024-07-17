import { PAGE_SIZE_OPTIONS } from '@components/FilterMenuComponent';
import { z } from 'zod';

export const FilterSchema = z.object({
  tags: z.array(z.string().optional()).optional().catch(undefined),
  title: z.string().optional().catch(undefined),
  views: z.number().optional().catch(undefined),
  pageSize: z.string().optional().default('15').catch('15'),
  page: z.string().optional().default('1').catch('1'),
});

export type FilterType = z.infer<typeof FilterSchema>;
