import { clientSchema } from "@schemas/clientSchema";
import {
  QueryClientProvider,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Client } from "@types";
import { ReactNode, createContext, useContext } from "react";

interface ClientProviderProps {
  children: ReactNode;
}

interface ClientContextType {
  clients: Client[] | undefined;
  useFetchClients: () => ReturnType<typeof useQuery>;
  useFetchClientById: (id: string) => ReturnType<typeof useQuery>;
  createClient: UseMutationResult<Client, Error, Client, unknown>;
  updateClient: UseMutationResult<Client, Error, Client, unknown>;
  deleteClient: UseMutationResult<void, Error, string, unknown>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: ClientProviderProps) {
  const queryClient = useQueryClient();

  const fetchClients = async (): Promise<Client[]> => {
    const response = await fetch("http://localhost/clients");
    if (!response.ok) {
      throw new Error("Erro ao buscar os clientes");
    }
    const data = await response.json();

    const parseResult = clientSchema.array().safeParse(data);
    if (!parseResult.success) {
      const formattedErrors = formatZodErrors(parseResult.error.format());
      throw new Error(JSON.stringify(formattedErrors));
    }

    return parseResult.data;
  };

  const fetchClientById = async (id: string): Promise<Client> => {
    const response = await fetch(`http://localhost/clients/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar o cliente");
    }
    const data = await response.json();

    const parseResult = clientSchema.safeParse(data);
    if (!parseResult.success) {
      const formattedErrors = formatZodErrors(parseResult.error.format());
      throw new Error(JSON.stringify(formattedErrors));
    }

    return parseResult.data;
  };

  const createClient = useMutation<Client, Error, Client>({
    mutationFn: async (newClient: Client) => {
      const parseResult = clientSchema.safeParse(newClient);
      if (!parseResult.success) {
        const formattedErrors = formatZodErrors(parseResult.error.format());
        throw new Error(JSON.stringify(formattedErrors));
      }

      const response = await fetch("http://localhost/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parseResult.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      const responseParseResult = clientSchema.safeParse(responseData);
      if (!responseParseResult.success) {
        const formattedErrors = formatZodErrors(
          responseParseResult.error.format()
        );
        throw new Error(JSON.stringify(formattedErrors));
      }

      return responseParseResult.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const updateClient = useMutation<Client, Error, Client>({
    mutationFn: async (updatedClient: Client) => {
      const parseResult = clientSchema.safeParse(updatedClient);
      if (!parseResult.success) {
        const formattedErrors = formatZodErrors(parseResult.error.format());
        throw new Error(JSON.stringify(formattedErrors));
      }

      const response = await fetch(
        `http://localhost/clients/${updatedClient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(parseResult.data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${JSON.stringify(errorData)}`);
      }

      const responseData = await response.json();
      const responseParseResult = clientSchema.safeParse(responseData);
      if (!responseParseResult.success) {
        const formattedErrors = formatZodErrors(
          responseParseResult.error.format()
        );
        throw new Error(JSON.stringify(formattedErrors));
      }

      return responseParseResult.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const deleteClient = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost/clients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar o cliente");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const useFetchClients = () =>
    useQuery<Client[], Error>({ queryKey: ["clients"], queryFn: fetchClients });

  const useFetchClientById = (id: string) =>
    useQuery<Client, Error>({
      queryKey: ["client", id],
      queryFn: () => fetchClientById(id),
    });

  function formatZodErrors(errors: any) {
    const cleanedErrors: any = {};

    for (const key in errors) {
      if (
        errors[key] &&
        errors[key]._errors &&
        errors[key]._errors.length > 0
      ) {
        cleanedErrors[key] = errors[key]._errors;
      }
    }

    return cleanedErrors;
  }

  const value = {
    clients: useFetchClients().data,
    useFetchClients,
    useFetchClientById,
    createClient,
    updateClient,
    deleteClient,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
    </QueryClientProvider>
  );
}

export function useClientContext() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
}
