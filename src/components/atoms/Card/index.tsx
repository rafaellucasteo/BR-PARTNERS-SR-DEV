import React from "react";
import { CustomPaperProps, StyledPaper } from "./styles";

interface PaperProps extends CustomPaperProps {
  children: React.ReactNode;
}

export default function Card({ children, ...rest }: PaperProps) {
  return <StyledPaper {...rest}>{children}</StyledPaper>;
}
