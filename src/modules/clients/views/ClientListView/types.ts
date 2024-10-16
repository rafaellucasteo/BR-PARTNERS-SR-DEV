import { ToastFeedbackHandle } from "@components/atoms/ToastFeedback";
import { Client } from "@types";
import { Dispatch, SetStateAction } from "react";

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
  selectedUser: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
  openModaDialog: boolean;
  setOpenModalDialog: Dispatch<SetStateAction<boolean>>;
  handleOpenModalDialog: () => void;
  handleCloseModalDialog: () => void;
  toastRef: React.RefObject<ToastFeedbackHandle>;
  toastMessage: string;
};
