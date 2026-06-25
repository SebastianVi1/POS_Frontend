import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: "El usuario tiene que tener almenos un caracter" }).max(25, { message: "Tiene que tener maximo 25 caracteres" }),
  password: z.string().min(6, { message: "Tienes que tener almenos 6 caracteres" })
})
