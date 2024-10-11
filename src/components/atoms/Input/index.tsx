import { Input as BaseInput, InputProps } from "@mui/base/Input";
import * as React from "react";
import styled from "styled-components";
import Box from "../Box";
import Text from "../Text";

export const Input = React.forwardRef(function CustomInput(
  props: InputProps & {
    error?: boolean;
    errorMessage?: any;
    label?: string;
    mandatory?: boolean;
  },
  ref: React.ForwardedRef<HTMLDivElement>
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
      <BaseInput
        slots={{
          input: (props) => <StyledInputElement {...props} error={error} />,
        }}
        {...restProps}
        ref={ref}
      />
      {error ? (
        <Text variant="body2" ml={1} mt={0.5} color="#b80e0e">
          {errorMessage}
        </Text>
      ) : null}
    </Box>
  );
});

const StyledInputElement = styled.input<{ error?: boolean }>`
  width: 320px;
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.2;
  padding: 8px 12px;
  border-radius: 8px;
  color: #1c2025;
  background: #fff;
  border: 1px solid ${({ error }) => (error ? "#b80e0e" : "#dae2ed")};

  &:hover {
    border-color: #3399ff;
  }

  &:focus {
    border-color: #3399ff;
    box-shadow: 0 0 0 0.5px #80bfff;
  }

  &:focus-visible {
    outline: 0;
  }
`;
