import React from "react";
import { CustomTypographyProps, StyledTypography } from "./styles";

interface TextProps extends CustomTypographyProps {
  children: React.ReactNode;
}

export default function Text({
  customSize,
  customColor,
  variant,
  children,
  ...rest
}: TextProps) {
  return (
    <StyledTypography variant={variant} {...rest}>
      {children}
    </StyledTypography>
  );
}
