import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email().min(1, { message: `Can't be empty.` }).trim(),
  username: z.string().min(1, { message: `Can't be empty.` }).trim(),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  birthDate: z.date(),
});

export type UserType = z.infer<typeof UserSchema>;

export const PostSchema = z.object({
  id: z.number(),
  date: z.date(),
  title: z.string(),
  description: z.string(),
  body: z.string(),
});

export type PostType = z.infer<typeof PostSchema>;

const CreatePostSchema = PostSchema.omit({ id: true });
export type CreatePostType = z.infer<typeof CreatePostSchema>;
