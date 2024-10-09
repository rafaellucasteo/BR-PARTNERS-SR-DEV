import { Client } from "../../../../types/client";

export type ClientListViewProps = {
  clients?: Client[];
  goToCreateClient: () => void;
};
