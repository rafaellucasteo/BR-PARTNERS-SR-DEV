import { http, HttpResponse } from "msw";
import { v4 as uuidv4 } from "uuid";
import { clientSchema } from "../../../schemas/clientSchema";
import { Client } from "../../../types/client";

const clients = new Map<string, Client>();

export const handlers = [
  http.get("http://localhost/clients/:id", async ({ params }) => {
    const { id } = params as { id: string };
    const client = clients.get(id);

    if (!client) {
      return HttpResponse.json(
        { message: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    return HttpResponse.json(client, { status: 200 });
  }),

  http.get("http://localhost/clients", async () => {
    const allClients = Array.from(clients.values());
    return HttpResponse.json(allClients, { status: 200 });
  }),

  http.post("http://localhost/clients", async ({ request }) => {
    try {
      const body = await request.json();

      const parseResult = clientSchema.safeParse(body);

      if (parseResult.success === false) {
        return HttpResponse.json(
          { errors: parseResult.error.issues },
          { status: 400 }
        );
      }

      const validatedData = parseResult.data;

      const id = uuidv4();

      const clientWithId: Client = {
        id,
        ...validatedData,
      };

      clients.set(id, clientWithId);

      return HttpResponse.json(clientWithId, { status: 201 });
    } catch (error) {
      console.error("Error in POST /clients handler:", error);
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }),

  http.put(
    "http://localhost/clients/:clientId",
    async ({ params, request }) => {
      try {
        const { clientId } = params as { clientId: string };

        if (!clientId) {
          return HttpResponse.json(
            { message: "Client ID is required" },
            { status: 400 }
          );
        }

        if (!clients.has(clientId)) {
          return HttpResponse.json(
            { message: "Client not found" },
            { status: 404 }
          );
        }

        const client = clients.get(clientId);

        const body = await request.json();

        const clientObject = client ? { ...client } : {};
        const bodyObject = body && typeof body === "object" ? { ...body } : {};

        const parseResult = clientSchema.safeParse({
          ...clientObject,
          ...bodyObject,
        });

        if (parseResult.success === false) {
          return HttpResponse.json(
            { errors: parseResult.error.issues },
            { status: 400 }
          );
        }

        const validatedData = parseResult.data;

        const existingClient = clients.get(clientId)!;

        const updatedClient: Client = {
          ...existingClient,
          ...validatedData,
        };

        clients.set(clientId, updatedClient);

        return HttpResponse.json(updatedClient, { status: 200 });
      } catch (error) {
        console.error("Error in PUT /clients/:clientId handler:", error);
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
  ),

  http.delete("http://localhost/clients/:clientId", async ({ params }) => {
    try {
      const { clientId } = params as { clientId: string };

      if (!clientId) {
        return HttpResponse.json(
          { message: "Client ID is required" },
          { status: 400 }
        );
      }

      if (!clients.has(clientId)) {
        return HttpResponse.json(
          { message: "Client not found" },
          { status: 404 }
        );
      }

      clients.delete(clientId);
      return HttpResponse.json(null, { status: 200 });
    } catch (error) {
      console.error("Error in DELETE /clients/:clientId handler:", error);
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }),

  http.get("http://localhost/", async () => {
    console.log('Intercepted a "GET /" request');
    return HttpResponse.json(
      { message: "Root path intercepted by MSW." },
      { status: 200 }
    );
  }),
];
