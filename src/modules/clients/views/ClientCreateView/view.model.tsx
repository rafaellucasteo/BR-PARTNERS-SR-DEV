import { ToastFeedbackHandle } from "@components/atoms/ToastFeedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterClientData, sanitize } from "@utils/validation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { clientSchema } from "../../../../schemas/clientSchema";
import { Client } from "../../../../types/client";
import { useClientContext } from "../../providers/ClientProvider";
import { CreateClientViewProps } from "./types";

export default function useCreateClientViewModel(): CreateClientViewProps {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { clients, createClient, useFetchClients } = useClientContext();

  const toastRef = useRef<ToastFeedbackHandle>(null);
  const handleShowToast = (meessage: string, type: "success" | "error") => {
    if (toastRef.current) {
      setToastMessage(meessage);
      toastRef.current.openToast(type);
    }
  };

  const {
    isError: isClientsError,
    error: clientsError,
    isLoading,
  } = useFetchClients();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<Client>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: undefined,
      type: "PF",
      clientName: "",
      fantasyName: "",
      businessName: "",
      document: "",
      email: "",
      phone: "",
    },
    mode: "onBlur",
    shouldFocusError: false,
    shouldUnregister: false,
  });

  const type = watch("type");

  // Watch fields and clear errors on change
  useEffect(() => {
    const subscription = watch((_value, { name }) => {
      if (name && errors[name]) {
        clearErrors(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors, errors]);

  useEffect(() => {
    setIsDisabled(!isValid);
  }, [isValid]);

  const onSubmit = (data: any) => {
    const filteredData = filterClientData(data);
    handleCreateClient(filteredData);
  };

  const handleCreateClient = (client: Client) => {
    const payload: Client = {
      ...client,
      document: sanitize(client.document),
      phone: sanitize(client.phone),
    };
    const filteredPayload = filterClientData(payload);
    console.log(filteredPayload);
    createClient.mutate(filteredPayload, {
      onError: (error: any) => {
        if (error.response) {
          console.error("Erro:", error.response.data);
        } else {
          handleShowToast(JSON.stringify(error), "error");
        }
      },
      onSuccess: (_data) => {
        handleShowToast("Sucesso ao criar a conta!", "success");
      },
    });
  };

  return {
    clients,
    isClientsError,
    clientsError,
    isLoading,
    toastRef,
    toastMessage,
    type,
    register,
    handleSubmit,
    setValue,
    errors,
    onSubmit,
    isDisabled,
  };
}
