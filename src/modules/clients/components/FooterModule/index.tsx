import Box from "@components/atoms/Box";

interface FooterModuleProps {
  children?: React.ReactNode;
}

export default function FooterModule({ children }: FooterModuleProps) {
  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      {children}
    </Box>
  );
}
