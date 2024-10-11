import { useNavigate } from "react-router-dom";
import Button from "../../../../components/atoms/Button";
import Text from "../../../../components/atoms/Text";
import Header from "../../../../components/molecules/Header";

interface HeaderModuleProps {
  title: string;
  test1?: () => void;
  test2?: () => void;
}

export default function HeaderModule({
  title,
  test1,
  test2,
}: HeaderModuleProps) {
  const navigate = useNavigate();
  return (
    <Header>
      <Text variant="h4" fontWeight="700" gutterBottom mb={0} color="#ffffff">
        {title}
      </Text>
      <Button
        onClick={() => {
          navigate("/");
        }}
        label="Listar Clientes"
      ></Button>
      <Button
        onClick={() => {
          navigate("/clients/register");
        }}
        label="Cadastrar Cliente"
      ></Button>
      {test1 ? (
        <Button
          onClick={() => {
            test1();
          }}
          label="Cadastrar Cliente PF"
        ></Button>
      ) : null}
      {test2 ? (
        <Button
          onClick={() => {
            test2();
          }}
          label="Cadastrar Cliente PJ"
        ></Button>
      ) : null}
    </Header>
  );
}
