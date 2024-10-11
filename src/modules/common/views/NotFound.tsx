import Screen from "@components/molecules/Screen";
import ErrorState from "../../clients/components/ErrorState";
import HeaderModule from "../../clients/components/HeaderModule";

import { useNavigate } from "react-router-dom";

export default function ClientView({}: {}) {
  const navigate = useNavigate();
  return (
    <Screen>
      <HeaderModule title="404 - Página não encontrada."></HeaderModule>
      <ErrorState
        title="Desculpe, não conseguimos encontrar o que você procura."
        subTitle="Parece que a página que você está procurando não existe mais. Verifique o link ou volte para a página inicial."
        labelAction="Voltar à página inicial"
        action={() => {
          navigate("/");
        }}
      />
    </Screen>
  );
}
