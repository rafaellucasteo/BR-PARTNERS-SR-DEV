import { ToastFeedbackHandle } from "@components/atoms/ToastFeedback";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "../../../../types/client";
import { useClientContext } from "../../providers/ClientProvider";
import { ClientListViewProps } from "./types";

export default function useClientListViewModel(): ClientListViewProps {
  const [openModaDialog, setOpenModalDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("Mensagem de teste");
  const handleOpenModalDialog = () => setOpenModalDialog(true);
  const handleCloseModalDialog = () => setOpenModalDialog(false);
  const navigate = useNavigate();
  const { clients, createClient, deleteClient, useFetchClients } =
    useClientContext();

  const toastRef = useRef<ToastFeedbackHandle>(null);
  const handleShowToast = (meessage: string, type: "success" | "error") => {
    if (toastRef.current) {
      setToastMessage(meessage);
      toastRef.current.openToast(type);
    }
  };

  // Obtendo os estados da consulta de clientes
  const {
    isError: isClientsError,
    error: clientsError,
    isLoading,
  } = useFetchClients();

  const goToCreateClient = () => {
    navigate("/clients/register");
  };

  const goToEditClient = (id: string) => {
    navigate("/clients/edit/" + id);
  };

  const handleCreateClientPF = () => {
    createClient.mutate(
      {
        type: "PF",
        clientName: "Novo Cliente",
        document: "11619905698",
        email: "teste@email.com",
        phone: "(35) 91234-5678",
      },
      {
        onError: (error: any) => {
          if (error.response) {
            console.error("Erro:", error.response.data);
          } else {
            console.error("Erro genérico:", error);
          }
        },
        onSuccess: (data) => {
          console.log("Sucesso:", data);
        },
      }
    );
  };

  const handleCreateClientPJ = () => {
    createClient.mutate(
      {
        type: "PJ",
        document: "99182942000103",
        email: "teste@empresa.com",
        phone: "(91) 91234-5678",
        fantasyName: "FantasyName",
        businessName: "BusinessName",
      },
      {
        onError: (error: any) => {
          if (error.response) {
            console.error("Erro:", error.response.data);
          } else {
            console.error("Erro genérico:", error);
          }
        },
        onSuccess: (data) => {
          console.log("Sucesso:", data);
        },
      }
    );
  };

  const handleDeleteClient = (id: string) => {
    deleteClient.mutate(id, {
      onError: (error: any) => {
        if (error.response) {
          console.error("Erro:", error.response.data);
        } else {
          console.error("Erro genérico:", error);
          handleShowToast(JSON.stringify(error), "error");
        }
      },
      onSuccess: () => {
        console.log("Cliente deletado com sucesso");
        handleShowToast("Cliente deletado com sucesso", "success");
      },
    });
  };

  const standardizeClientsData = (clients: Client[]): Client[] => {
    return clients.map((client) => {
      let name = "";

      if (client.type === "PF") {
        name = client.clientName || "";
      } else if (client.type === "PJ") {
        name = `${client.fantasyName || ""} / ${
          client.businessName || ""
        }`.trim();
      }

      return {
        id: client.id,
        type: client.type,
        name,
        document: client.document,
        phone: client.phone,
        email: client.email,
      };
    });
  };

  return {
    clients,
    goToCreateClient,
    handleCreateClientPF,
    handleCreateClientPJ,
    handleDeleteClient,
    goToEditClient,
    isClientsError,
    clientsError,
    isLoading,
    standardizeClientsData,
    selectedUser,
    setSelectedUser,
    openModaDialog,
    setOpenModalDialog,
    handleOpenModalDialog,
    handleCloseModalDialog,
    toastRef,
    toastMessage,
  };
}
