import { z } from 'zod';

export const FilterSchema = z.object({
  tags: z.array(z.string().optional()).optional().catch([]),
  title: z.string().optional().catch(''),
  views: z.number().optional().catch(1000),
  pageSize: z.string().optional().default('100').catch('100'),
  page: z.string().optional().default('1').catch('1'),
});

export type FilterType = z.infer<typeof FilterSchema>;
