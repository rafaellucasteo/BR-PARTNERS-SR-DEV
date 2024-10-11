import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "../../../../../../components/atoms/Box";
import Button from "../../../../../../components/atoms/Button";
import Card from "../../../../../../components/atoms/Card";
import DataGrid from "../../../../../../components/atoms/DataGrid";
import { Client } from "../../../../../../types/client";

interface ScreenProps {
  rows: Client[];
  handleEdit: (id: string) => void;
  handleSelect: (id: string) => void;
  handleOpenModal: () => void;
}

export default function ClientTable({
  rows,
  handleEdit,
  handleSelect,
  handleOpenModal,
}: ScreenProps) {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 290 },
    { field: "type", headerName: "Type", width: 20 },
    { field: "document", headerName: "Document", width: 170 },
    { field: "phone", headerName: "Phone", width: 160 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "id", headerName: "Id", width: 300 },
    {
      field: "options",
      headerName: "Options",
      width: 170,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button onClick={() => handleEdit(params.row.id)} label="Editar" />
          <Button
            color="error"
            onClick={() => {
              handleOpenModal();
              handleSelect(params.row.id);
            }}
            label="Deletar"
          />
        </Box>
      ),
    },
  ];

  return (
    <Card>
      <DataGrid rows={rows} columns={columns} />
    </Card>
  );
}
