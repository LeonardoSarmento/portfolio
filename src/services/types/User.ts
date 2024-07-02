import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string({ required_error: 'O campo é obrigatório amigão' })
    // .email({ message: 'Verifica ai que tem coisa estranha nesse email ai tá' })
    .trim(),
  password: z
    .string({ required_error: 'Preciso dele pra testar aqui na maquininha' })
    .min(3, { message: 'Tá faltando número nisso ai amigo' })
    .max(14, { message: 'Oloko amigo isso não é alemão não pra que tanta letra' })
    .trim(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  birthDate: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

const tagSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});
export type TagType = z.infer<typeof tagSchema>;

export const PostSchema = z.object({
  id: z.number(),
  date: z.date(),
  title: z
    .string({ required_error: 'Como vc quer que o pessoal leia se nem titulo tu ta colocando??' })
    .min(1, { message: 'Título vazio não vale amigão' }),
  description: z
    .string({ required_error: 'Sem descrição fica dificil dos outros te entenderam' })
    .min(1, { message: 'Faz um esforço de uma descriçãozinha pfv ajuda ai' }),
  tags: z.array(tagSchema).optional(),
  body: z
    .string({ required_error: 'Ué?? achei que vc tava aqui pra compartilhar td seu conhecimento, escreve algo ai' })
    .min(1, { message: 'Vc tem que escrever mais que isso cara, para de preguiça...' }),
  file: z
    .instanceof(File)
    .refine((file) => (file ? file : null), 'File is required.')
    .nullable(),
  thumbnail: z.string().optional(),
});

export type PostType = z.infer<typeof PostSchema>;

export const CreatePostSchema = PostSchema.omit({ id: true });
export type CreatePostType = z.infer<typeof CreatePostSchema>;
