import ToastFeedback from "../../../../components/atoms/ToastFeedback";
import Screen from "../../../../components/molecules/Screen";
import ErrorState from "../../components/ErrorState";
import HeaderModule from "../../components/HeaderModule";
import LoadingState from "../../components/LoadingState";
import ModalDialog from "../../components/ModalDialog";
import ZeroState from "../../components/ZeroState";
import ClientTable from "./components/ClientTable";
import { ClientListViewProps } from "./types";

export default function ClientView({
  clients,
  goToCreateClient,
  handleDeleteClient,
  goToEditClient,
  isClientsError,
  isLoading,
  standardizeClientsData,
  selectedUser,
  setSelectedUser,
  openModaDialog,
  setOpenModalDialog,
  handleOpenModalDialog,
  handleCloseModalDialog,
  toastMessage,
  toastRef,
}: ClientListViewProps) {
  return (
    <Screen>
      <HeaderModule title="C.R.U.D - MVVM - Listagem de Clientes" />
      {clients && clients?.length && !isClientsError ? (
        <ClientTable
          rows={clients ? standardizeClientsData(clients) : []}
          handleOpenModal={() => handleOpenModalDialog()}
          handleEdit={(id: string) => goToEditClient(id)}
          handleSelect={(id: string) => setSelectedUser(id)}
        />
      ) : null}

      {isClientsError ? (
        <ErrorState
          title="Ops! Algo inesperado aconteceu,"
          subTitle="Verifique sua conexão com a internet e tente novamente mais tarde"
          labelAction="Tentar novamente"
          action={() => {
            window.location.reload();
          }}
        />
      ) : null}

      {!isClientsError && !clients?.length && !isLoading ? (
        <ZeroState
          title="Nenhum cliente cadastrado,"
          subTitle="Começe registrando seu primeiro cliente"
          labelAction="Registrar Cliente"
          action={() => {
            goToCreateClient();
          }}
        />
      ) : null}

      {isLoading ? <LoadingState /> : null}

      <ModalDialog
        open={openModaDialog}
        onClose={handleCloseModalDialog}
        title="Tem certeza que deseja continuar?"
        subTitle="Essa ação é irreversível e não poderá ser desfeita. Deseja
       prosseguir?"
        onConfirm={() => {
          handleDeleteClient(selectedUser);
          setOpenModalDialog(false);
        }}
        onCancel={() => {
          setOpenModalDialog(false);
        }}
      />
      <ToastFeedback ref={toastRef} message={toastMessage} />
    </Screen>
  );
}
