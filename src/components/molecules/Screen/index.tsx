import React from "react";
import Box from "../../atoms/Box";

interface ScreenProps {
  children: React.ReactNode;
}

export default function Screen({ children }: ScreenProps) {
  return (
    <Box // (ALGUM COMPONENTE BASE PARA AS PAGINAS) SCREEN? //
      sx={{
        display: "flex", // Define o container como flexbox
        justifyContent: "center", // Centraliza os filhos horizontalmente
        alignItems: "center", // Centraliza os filhos verticalmente (opcional, caso queira centralizar também na vertical)
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      {/* BOX */}
      <Box sx={{ width: "90%" }}>{children}</Box>
    </Box>
  );
}
