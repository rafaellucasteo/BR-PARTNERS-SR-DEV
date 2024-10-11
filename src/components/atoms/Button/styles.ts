import { Button, ButtonProps } from "@mui/material";
import styled from "styled-components";

export interface CustomButtonProps extends ButtonProps {}

export const StyledButton = styled(Button)<CustomButtonProps>``;
