import {
  QueryClientProvider,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactNode, createContext, useContext } from "react";
import { Client } from "../../../types/client";

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
    const response = await fetch("/api/clients");
    if (!response.ok) {
      throw new Error("Erro ao buscar os clientes");
    }
    return response.json();
  };

  const fetchClientById = async (id: string): Promise<Client> => {
    const response = await fetch(`/api/clients/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar o cliente");
    }
    return response.json();
  };

  const createClient = useMutation<Client, Error, Client>({
    mutationFn: async (newClient: Client) => {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClient),
      });
      if (!response.ok) {
        throw new Error("Erro ao criar o cliente");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const updateClient = useMutation<Client, Error, Client>({
    mutationFn: async (updatedClient: Client) => {
      const response = await fetch(`/api/clients/${updatedClient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClient),
      });
      if (!response.ok) {
        throw new Error("Erro ao atualizar o cliente");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const deleteClient = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/clients/${id}`, {
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
