import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListClientsView from "./modules/clients/views/ClientListView";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListClientsView />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
