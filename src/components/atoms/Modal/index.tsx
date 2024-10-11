import { CustomModalProps, StyledModal } from "./styles";

interface ModalProps extends CustomModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactElement;
}

export default function Modal({
  open,
  onClose,
  children,
  ...rest
}: ModalProps) {
  return (
    <StyledModal
      open={open}
      onClose={() => {
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...rest}
    >
      {children}
    </StyledModal>
  );
}
