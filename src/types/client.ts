import { clientSchema } from "@schemas/clientSchema";
import { z } from "zod";

export type Client = z.infer<typeof clientSchema>;
