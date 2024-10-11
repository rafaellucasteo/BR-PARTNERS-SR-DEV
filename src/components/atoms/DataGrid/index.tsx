import { CustomDataGridProps, StyledDataGrid } from "./styles";

import { GridColDef } from "@mui/x-data-grid";

interface BoxProps extends CustomDataGridProps {
  columns: GridColDef[];
  rows: any;
}

const paginationModel = { page: 0, pageSize: 5 };

export default function DataGrid({ columns, rows, ...rest }: BoxProps) {
  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10, 15]}
      disableRowSelectionOnClick
      {...rest}
    />
  );
}
