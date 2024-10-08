import { z } from "zod";
import { clientSchema } from "../schemas/clientSchema";

export type Client = z.infer<typeof clientSchema>;
