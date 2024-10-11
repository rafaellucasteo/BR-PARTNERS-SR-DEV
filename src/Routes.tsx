import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateClientsView from "./modules/clients/views/ClientCreateView";
import ClientEditView from "./modules/clients/views/ClientEditView";
import ListClientsView from "./modules/clients/views/ClientListView";
import NotFound from "./modules/common/views/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListClientsView />} />
        <Route path="/clients/register" element={<CreateClientsView />} />
        <Route path="/clients/edit/:id" element={<ClientEditView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
