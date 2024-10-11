import { ToastFeedbackHandle } from "@components/atoms/ToastFeedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema } from "@schemas/clientSchema";
import { Client } from "@types";
import { filterClientData, sanitize } from "@utils/validation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useClientContext } from "../../providers/ClientProvider";
import { EditClientViewProps } from "./types";

export default function useEditClientViewModel(): EditClientViewProps {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [client, setClient] = useState<Client>();
  const { clients, updateClient, useFetchClientById } = useClientContext();

  const toastRef = useRef<ToastFeedbackHandle>(null);
  const handleShowToast = (message: string, type: "success" | "error") => {
    if (toastRef.current) {
      setToastMessage(message);
      toastRef.current.openToast(type);
    }
  };

  const goToClientListView = () => {
    navigate("/");
  };

  const { id } = useParams<{ id: string }>();

  const {
    isError: isClientsError,
    error: clientsError,
    isLoading,
    data,
  } = useFetchClientById(id || "0");

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

  const isClient = (data: any): data is Client => {
    return (
      data && typeof data === "object" && "type" in data && "document" in data
    );
  };

  useEffect(() => {
    if (isClient(data)) {
      setValue("id", data.id);
      setValue("type", data.type);
      setValue("clientName", data.clientName ?? "");
      setValue("fantasyName", data.fantasyName ?? "");
      setValue("businessName", data.businessName ?? "");
      setValue("document", data.document);
      setValue("email", data.email);
      setValue("phone", data.phone);
      setClient(data);
    }
  }, [data, setValue]);

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
    handleUpdateClient(filteredData);
  };

  const handleUpdateClient = (client: Client) => {
    const payload: Client = {
      ...client,
      document: sanitize(client.document),
      phone: sanitize(client.phone),
    };
    const filteredPayload = filterClientData(payload);
    console.log(filteredPayload);
    updateClient.mutate(filteredPayload, {
      onError: (error: any) => {
        if (error.response) {
          console.error("Erro:", error.response.data);
        } else {
          handleShowToast(JSON.stringify(error), "error");
        }
      },
      onSuccess: (_data) => {
        handleShowToast("Salvo com sucesso!", "success");
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
    client,
    goToClientListView,
    isDisabled,
  };
}
