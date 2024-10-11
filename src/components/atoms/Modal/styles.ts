import Modal, { ModalProps } from "@mui/material/Modal";
import styled from "styled-components";

export interface CustomModalProps extends ModalProps {}

export const StyledModal = styled(Modal)<CustomModalProps>``;
