import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().min(1, 'メールアドレスは必須です').email('メールアドレスの形式が不正です'),
});

export type UserInput = z.infer<typeof UserSchema>;
