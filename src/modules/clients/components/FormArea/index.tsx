import Card from "../../../../components/atoms/Card";

interface FormAreaProps {
  children: React.ReactNode;
}

export default function FormArea({ children }: FormAreaProps) {
  return (
    <Card
      elevation={1}
      sx={{
        height: 500,
        width: 1323,
      }}
    >
      {children}
    </Card>
  );
}
