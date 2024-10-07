import { z } from "zod";

const phoneRegex = /^\(?\d{2}\)?\s9\d{4}-\d{4}$/;

const pfSchema = z.object({
  type: z.literal("PF"),
  clientName: z.string().nonempty("Nome é obrigatório para PF"),
  document: z.string().length(11, "CPF deve conter 11 dígitos"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(phoneRegex, "Telefone inválido"),
});

const pjSchema = z.object({
  type: z.literal("PJ"),
  fantasyName: z.string().nonempty("Nome Fantasia é obrigatório para PJ"),
  businessName: z.string().nonempty("Razão Social é obrigatória para PJ"),
  document: z.string().length(14, "CNPJ deve conter 14 dígitos"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(phoneRegex, "Telefone inválido"),
});

export const clientSchema = z.discriminatedUnion("type", [pfSchema, pjSchema]);
