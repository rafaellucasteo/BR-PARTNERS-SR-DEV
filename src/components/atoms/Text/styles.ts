import { Typography, TypographyProps } from "@mui/material";
import styled from "styled-components";

// Definindo as variantes permitidas
export type Variant =
  | "h4"
  | "subtitle2"
  | "subtitle1"
  | "overline"
  | "h6"
  | "body1"
  | "body2"
  | "caption";

export interface CustomTypographyProps extends TypographyProps {
  customSize?: string;
  customColor?: string;
  variant?: Variant; // Tornando a variante obrigatória e com opções específicas
}

export const StyledTypography = styled(Typography)<CustomTypographyProps>`
  //font-size: ${({ customSize }) => (customSize ? customSize : null)};
  //color: ${({ customColor }) => (customColor ? customColor : null)};
`;
