import Box from "../../../../components/atoms/Box";
import Button from "../../../../components/atoms/Button";
import { Input } from "../../../../components/atoms/Input";
import { RadioInput } from "../../../../components/atoms/RadioButton";
import Text from "../../../../components/atoms/Text";
import ToastFeedback from "../../../../components/atoms/ToastFeedback";
import Screen from "../../../../components/molecules/Screen";
import ErrorState from "../../components/ErrorState";

import FooterModule from "../../components/FooterModule";
import FormArea from "../../components/FormArea";
import HeaderModule from "../../components/HeaderModule";
import LoadingState from "../../components/LoadingState";
import { EditClientViewProps } from "./types";

export default function EditClientView({
  toastMessage,
  toastRef,
  errors,
  type,
  setValue,
  handleSubmit,
  register,
  client,
  onSubmit,
  isLoading,
  goToClientListView,
}: EditClientViewProps) {
  return (
    <Screen>
      <HeaderModule title="C.R.U.D - MVVM - Edição de cliente" />
      {isLoading ? (
        <LoadingState></LoadingState>
      ) : client ? (
        <FormArea>
          <Box display={"flex"} flexWrap={"wrap"} ml={5} pt={3}>
            <Text variant="h6">Editar cliente</Text>
          </Box>

          <Box display={"flex"} flexWrap={"wrap"} ml={5} pt={2}>
            <RadioInput
              mandatory
              label="Pessoa Física"
              checked={type === "PF"}
              onClick={() => {
                setValue("type", "PF", { shouldValidate: true });
              }}
            />
            <RadioInput
              mandatory
              label="Pessoa Jurídica"
              checked={type === "PJ"}
              onClick={() => {
                setValue("type", "PJ", { shouldValidate: true });
              }}
            />
          </Box>
          <Box flexWrap={"wrap"} display={"flex"} ml={5} pt={0}>
            {type === "PF" ? (
              <Input
                {...register("clientName")}
                mandatory
                label="Nome"
                placeholder="Digite o nome"
                error={!!errors.clientName}
                errorMessage={errors.clientName?.message}
              />
            ) : (
              <>
                <Input
                  {...register("businessName")}
                  mandatory
                  label="Razão Social"
                  placeholder="Digite a razão social"
                  error={!!errors.businessName}
                  errorMessage={errors.businessName?.message}
                />
                <Input
                  {...register("fantasyName")}
                  mandatory
                  label="Nome Fantasia"
                  placeholder="Digite o nome fantasia"
                  error={!!errors.fantasyName}
                  errorMessage={errors.fantasyName?.message}
                />
              </>
            )}
            <Input
              {...register("document")}
              mandatory
              label={type === "PJ" ? "CNPJ" : "CPF"}
              placeholder={type === "PJ" ? "Digite o CNPJ" : "Digite o CPF"}
              error={!!errors.document}
              errorMessage={errors.document?.message}
            />
            <Input
              {...register("phone")}
              mandatory
              label="Telefone"
              placeholder="Digite o telefone"
              error={!!errors.phone}
              errorMessage={errors.phone?.message}
            />
            <Input
              {...register("email")}
              mandatory
              label="Email"
              placeholder="Digite o email"
              error={!!errors.email}
              errorMessage={errors.email?.message}
            />
          </Box>
          <FooterModule>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              type="submit"
              label="Salvar"
            />
          </FooterModule>
        </FormArea>
      ) : (
        <ErrorState
          title={"Cliente não encontrado"}
          subTitle={"Clique abaixo para retornar à listagem de clientes."}
          action={() => {
            goToClientListView();
          }}
          labelAction={"Exibir listagem de clientes"}
        ></ErrorState>
      )}

      <ToastFeedback ref={toastRef} message={toastMessage} />
    </Screen>
  );
}
