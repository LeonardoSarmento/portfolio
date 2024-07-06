import { z } from 'zod';

export const FilterSchema = z.object({
  tags: z.array(z.string().optional()).optional().catch([]),
  title: z.string().optional().catch(''),
  views: z.number().optional().catch(1000),
  count: z.string().optional().catch('100'),
});

export type FilterType = z.infer<typeof FilterSchema>;
