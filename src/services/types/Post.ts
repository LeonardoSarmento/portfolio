import { z } from 'zod';
import { TagSchema } from './Tag';

export const PostSchema = z.object({
  id: z.string(),
  date: z.date(),
  title: z
    .string({ required_error: 'Como vc quer que o pessoal leia se nem titulo tu ta colocando??' })
    .min(1, { message: 'Título vazio não vale amigão' }),
  description: z
    .string({ required_error: 'Sem descrição fica dificil dos outros te entenderam' })
    .min(1, { message: 'Faz um esforço de uma descriçãozinha pfv ajuda ai' }),
  tags: z.array(TagSchema).optional(),
  body: z
    .string({ required_error: 'Ué?? achei que vc tava aqui pra compartilhar td seu conhecimento, escreve algo ai' })
    .min(1, { message: 'Vc tem que escrever mais que isso cara, para de preguiça...' }),
  file: z
    .instanceof(File)
    .refine((file) => (file ? file : null), 'File is required.')
    .nullable(),
  thumbnail: z.string().optional(),
  editable: z.boolean().optional(),
});

export type PostType = z.infer<typeof PostSchema>;

export const CreatePostSchema = PostSchema.omit({ id: true, thumbnail: true, date: true });
export type CreatePostType = z.infer<typeof CreatePostSchema>;

export const EditPostSchema = PostSchema.omit({ id: true, date: true });
export type EditPostType = z.infer<typeof EditPostSchema>;
