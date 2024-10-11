import { PaperProps } from "@mui/material";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

export interface CustomPaperProps extends PaperProps {}

export const StyledPaper = styled(Paper)<CustomPaperProps>``;
