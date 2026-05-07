import { z } from "zod";

export const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
  }),
});