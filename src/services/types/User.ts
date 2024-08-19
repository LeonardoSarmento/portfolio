import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string({ required_error: 'login_username_required_error' })
    // .email({ message: 'Verifica ai que tem coisa estranha nesse email ai tá' })
    .trim(),
  password: z
    .string({ required_error: 'login_password_required_error' })
    .min(3, { message: 'login_password_min' })
    .max(14, { message: 'login_password_max' })
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
