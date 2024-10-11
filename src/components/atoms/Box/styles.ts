import { BoxProps } from "@mui/material";
import styled from "styled-components";

import Box from "@mui/material/Box";

export interface CustomBoxProps extends BoxProps {}

export const StyledBox = styled(Box)<CustomBoxProps>``;
