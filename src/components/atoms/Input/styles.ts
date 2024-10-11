import { Input as BaseInput, InputProps } from "@mui/base/Input";
import styled from "styled-components";

export const StyledBaseInput = styled(BaseInput)<InputProps>`
  width: 320px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 8px;
  color: #1c2025;
  background: #fff;
  border: 0.5px solid #b0b8c4;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: #3399ff;
  }

  &:focus {
    border-color: #3399ff;
    box-shadow: 0 0 0 4px rgba(51, 153, 255, 0.5);
  }

  &:focus-visible {
    outline: 0;
  }
`;
