import React from "react";
import { CustomBoxProps, StyledBox } from "./styles";

interface BoxProps extends CustomBoxProps {
  children: React.ReactNode;
}

export default function Box({ children, ...rest }: BoxProps) {
  return <StyledBox {...rest}>{children}</StyledBox>;
}
