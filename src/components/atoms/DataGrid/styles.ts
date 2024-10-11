import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import styled from "styled-components";

export interface CustomDataGridProps extends DataGridProps {}

export const StyledDataGrid = styled(DataGrid)<CustomDataGridProps>`
  height: 400px;
`;
