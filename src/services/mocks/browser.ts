import { setupWorker } from "msw/browser";
import { handlers } from "./clients/handlers";

export const worker = setupWorker(...handlers);
