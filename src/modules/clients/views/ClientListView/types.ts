import { ToastFeedbackHandle } from "@components/atoms/ToastFeedback";
import { Dispatch, SetStateAction } from "react";
import { Client } from "../../../../types/client";

export type ClientListViewProps = {
  clients?: Client[];
  goToCreateClient: () => void;
  handleCreateClientPF: () => void;
  handleCreateClientPJ: () => void;
  handleDeleteClient: (id: string) => void;
  goToEditClient: (id: string) => void;
  standardizeClientsData: (clients: Client[]) => Client[];
  isClientsError: boolean;
  isLoading: boolean;
  clientsError: any;
  /* USER */
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  /* MODAL */
  openModaDialog: boolean;
  setOpenModalDialog: Dispatch<SetStateAction<boolean>>;
  handleOpenModalDialog: () => void;
  handleCloseModalDialog: () => void;
  toastRef: React.RefObject<ToastFeedbackHandle>;
  toastMessage: string;
};
