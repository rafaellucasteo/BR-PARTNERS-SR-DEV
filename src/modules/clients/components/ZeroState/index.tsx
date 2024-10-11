import Box from "../../../../components/atoms/Box";
import Button from "../../../../components/atoms/Button";
import Card from "../../../../components/atoms/Card";
import Text from "../../../../components/atoms/Text";

interface ZerorStateProps {
  title: string;
  subTitle: string;
  action: () => void;
  labelAction: string;
}

export default function ZeroState({
  title,
  subTitle,
  action,
  labelAction,
}: ZerorStateProps) {
  return (
    <Card
      elevation={1}
      sx={{
        height: 400,
        width: 1323,
        display: "flex",
      }}
    >
      <Box sx={{ padding: 15 }}>
        <Text variant="h4" fontWeight="700" gutterBottom mb={0}>
          {title}
        </Text>

        <Text variant="overline" fontWeight="400" gutterBottom>
          {subTitle}
        </Text>

        <Box
          sx={{
            alignSelf: "center",
          }}
          mt={5}
        >
          <Button
            variant="outlined"
            size="medium"
            onClick={() => action()}
            label={labelAction}
          ></Button>
        </Box>
      </Box>
    </Card>
  );
}
