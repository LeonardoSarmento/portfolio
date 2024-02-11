import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
