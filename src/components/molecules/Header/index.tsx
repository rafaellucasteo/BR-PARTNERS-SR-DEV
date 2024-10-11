import React from "react";
import Box from "../../atoms/Box";

interface ScreenProps {
  children: React.ReactNode;
}

export default function Header({ children }: ScreenProps) {
  return (
    <Box mb={10} mt={5}>
      {/* BOX */}
      <Box>{children}</Box>
    </Box>
  );
}
