import { z } from "zod";
import { isValidCnpj, isValidCpf, isValidEmail, isValidPhone } from "../utils";

export const baseClientSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["PF", "PJ"]),
  clientName: z.string().optional(),
  fantasyName: z.string().optional(),
  businessName: z.string().optional(),
  document: z.string(),
  email: z.string(),
  phone: z.string(),
});

export const clientSchema = baseClientSchema.superRefine((data, ctx) => {
  if (data.type === "PF" && !data.clientName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["clientName"],
      message: "Nome é obrigatório para PF",
    });
  }

  if (data.type === "PJ") {
    if (!data.fantasyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["fantasyName"],
        message: "Nome Fantasia é obrigatório para PJ",
      });
    }
    if (!data.businessName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["businessName"],
        message: "Razão Social é obrigatória para PJ",
      });
    }
  }

  if (data.type === "PF" && !isValidCpf(data.document)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["document"],
      message: "CPF inválido",
    });
  } else if (data.type === "PJ" && !isValidCnpj(data.document)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["document"],
      message: "CNPJ inválido",
    });
  }

  if (!isValidEmail(data.email)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["email"],
      message: "Email inválido",
    });
  }

  if (!isValidPhone(data.phone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phone"],
      message: "Telefone inválido",
    });
  }
});
