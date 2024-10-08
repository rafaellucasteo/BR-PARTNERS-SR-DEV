import { setupServer } from "msw/node";
import { handlers } from "./clients/handlers";

export const server = setupServer(...handlers);
