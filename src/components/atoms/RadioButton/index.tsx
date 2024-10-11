import Radio, { RadioProps } from "@mui/material/Radio";
import styled from "styled-components";

const RadioButton = styled(Radio)`
  color: #3399ff;
  &.Mui-checked {
    color: #0072e5;
  }
`;

import * as React from "react";
import Box from "../Box";
import Text from "../Text";

export const RadioInput = React.forwardRef(function CustomInput(
  props: RadioProps & {
    error?: boolean;
    errorMessage?: string;
    label?: string;
    mandatory?: boolean;
    placeholder?: string;
  }
) {
  const { error, errorMessage, label, mandatory, ...restProps } = props;

  return (
    <Box m={2}>
      {label ? (
        <Text variant="body2" ml={1} mb={0.5} color="#545454">
          {label}
          {mandatory ? " *" : null}
        </Text>
      ) : null}
      <RadioButton {...restProps}></RadioButton>
      {error ? (
        <Text variant="body2" ml={1} mt={0.5} color="#b80e0e">
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
});
