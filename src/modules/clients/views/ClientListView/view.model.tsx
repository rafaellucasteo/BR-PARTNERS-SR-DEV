import { useNavigate } from "react-router-dom";
import { useClientContext } from "../../providers/ClientProvider";
import { ClientListViewProps } from "./types";

export default function useClientListViewModel(): ClientListViewProps {
  const navigate = useNavigate();
  const { clients } = useClientContext();
  const goToCreateClient = () => {
    navigate("/clients/create");
  };

  return { clients, goToCreateClient };
}
