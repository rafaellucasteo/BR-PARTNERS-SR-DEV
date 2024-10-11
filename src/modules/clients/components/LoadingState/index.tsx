import Box from "@components/atoms/Box";
import Card from "@components/atoms/Card";
import { LinearProgress } from "@mui/material";

interface LoadingStateProps {}

export default function LoadingState({}: LoadingStateProps) {
  return (
    <Card
      elevation={1}
      sx={{
        height: 400,
        width: 1323,
        display: "flex",
        backgroundColor: "#042940",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </Card>
  );
}
