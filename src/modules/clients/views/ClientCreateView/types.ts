import { ToastFeedbackHandle } from "@components/atoms/ToastFeedback";
import { Client } from "@types";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type CreateClientViewProps = {
  clients?: Client[];
  isClientsError: boolean;
  isLoading: boolean;
  clientsError: any;
  toastRef: React.RefObject<ToastFeedbackHandle>;
  toastMessage: string;
  type: string;
  register: UseFormRegister<Client>;
  handleSubmit: UseFormHandleSubmit<Client>;
  setValue: UseFormSetValue<Client>;
  errors: FieldErrors<Client>;
  onSubmit: (data: Client) => void;
  isDisabled: boolean;
};
