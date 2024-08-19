import { z } from 'zod';
import { TagSchema } from './Tag';

export const PublicationSchema = z.object({
  id: z.string(),
  date: z.date(),
  title: z.string({ required_error: 'publication_title_required_error' }).min(1, { message: 'publication_title_min' }),
  description: z
    .string({ required_error: 'publication_description_required_error' })
    .min(1, { message: 'publication_description_min' }),
  tags: z.array(TagSchema).optional(),
  body: z.string({ required_error: 'publication_body_required_error' }).min(1, { message: 'publication_body_min' }),
  file: z
    .instanceof(File)
    .refine((file) => (file ? file : null), 'publication_file_required_error')
    .nullable(),
  thumbnail: z.string().optional(),
  editable: z.boolean().optional(),
});

export type PublicationType = z.infer<typeof PublicationSchema>;

export const CreatePublicationSchema = PublicationSchema.omit({ id: true, thumbnail: true, date: true });
export type CreatePublicationType = z.infer<typeof CreatePublicationSchema>;

export const EditPublicationSchema = PublicationSchema.omit({ id: true, date: true });
export type EditPublicationType = z.infer<typeof EditPublicationSchema>;
