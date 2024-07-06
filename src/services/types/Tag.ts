import { z } from 'zod';

export const TagSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});
export type TagType = z.infer<typeof TagSchema>;
